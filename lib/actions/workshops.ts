'use server';

import { db } from '@/lib/db/drizzle';
import { workshops, workshopEnrollments, workshopFiles, users } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, and, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 200);
}

// Create Workshop (Admin only)
export async function createWorkshop(formData: FormData) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const room = formData.get('room') as string;
    const startsAt = formData.get('startsAt') as string;
    const endsAt = formData.get('endsAt') as string;
    const capacity = parseInt(formData.get('capacity') as string) || null;
    const isPublic = formData.get('isPublic') === 'true';
    const status = (formData.get('status') as string) || 'DRAFT';
    const meetingUrl = formData.get('meetingUrl') as string;
    const materialsUrl = formData.get('materialsUrl') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!title) {
      return { error: 'Title is required' };
    }

    const slug = generateSlug(title);

    const [workshop] = await db.insert(workshops).values({
      title,
      slug,
      description: description || null,
      location: location || null,
      room: room || null,
      startsAt: startsAt ? new Date(startsAt) : null,
      endsAt: endsAt ? new Date(endsAt) : null,
      capacity,
      isPublic,
      status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      meetingUrl: meetingUrl || null,
      materialsUrl: materialsUrl || null,
      imageUrl: imageUrl || null,
      createdBy: user.id,
    }).returning();

    revalidatePath('/dashboard/workshops');
    revalidatePath('/workshops');

    return { success: true, workshop };
  } catch (error) {
    console.error('Error creating workshop:', error);
    return { error: 'Failed to create workshop' };
  }
}

// Update Workshop (Admin only)
export async function updateWorkshop(workshopId: number, formData: FormData) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const room = formData.get('room') as string;
    const startsAt = formData.get('startsAt') as string;
    const endsAt = formData.get('endsAt') as string;
    const capacity = parseInt(formData.get('capacity') as string) || null;
    const isPublic = formData.get('isPublic') === 'true';
    const status = (formData.get('status') as string) || 'DRAFT';
    const meetingUrl = formData.get('meetingUrl') as string;
    const materialsUrl = formData.get('materialsUrl') as string;
    const imageUrl = formData.get('imageUrl') as string;

    if (!title) {
      return { error: 'Title is required' };
    }

    const slug = generateSlug(title);

    const [workshop] = await db.update(workshops)
      .set({
        title,
        slug,
        description: description || null,
        location: location || null,
        room: room || null,
        startsAt: startsAt ? new Date(startsAt) : null,
        endsAt: endsAt ? new Date(endsAt) : null,
        capacity,
        isPublic,
        status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        meetingUrl: meetingUrl || null,
        materialsUrl: materialsUrl || null,
        imageUrl: imageUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(workshops.id, workshopId))
      .returning();

    revalidatePath('/dashboard/workshops');
    revalidatePath('/workshops');

    return { success: true, workshop };
  } catch (error) {
    console.error('Error updating workshop:', error);
    return { error: 'Failed to update workshop' };
  }
}

// Delete Workshop (Admin only)
export async function deleteWorkshop(workshopId: number) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
    }

    await db.delete(workshops).where(eq(workshops.id, workshopId));

    revalidatePath('/dashboard/workshops');
    revalidatePath('/workshops');

    return { success: true };
  } catch (error) {
    console.error('Error deleting workshop:', error);
    return { error: 'Failed to delete workshop' };
  }
}

// Get All Workshops (Admin sees all, students see published & public)
export async function getWorkshops() {
  try {
    const user = await getUser();

    let workshopList;
    if (user?.role === 'ADMIN') {
      // Admin sees all workshops
      workshopList = await db.select().from(workshops).orderBy(desc(workshops.createdAt));
    } else {
      // Students and public see only published and public workshops
      workshopList = await db
        .select()
        .from(workshops)
        .where(and(
          eq(workshops.status, 'PUBLISHED'),
          eq(workshops.isPublic, true)
        ))
        .orderBy(desc(workshops.startsAt));
    }

    return { workshops: workshopList };
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return { workshops: [] };
  }
}

// Get Single Workshop
export async function getWorkshop(workshopId: number) {
  try {
    const [workshop] = await db
      .select()
      .from(workshops)
      .where(eq(workshops.id, workshopId));

    if (!workshop) {
      return { error: 'Workshop not found' };
    }

    // Get enrollments count
    const enrollments = await db
      .select()
      .from(workshopEnrollments)
      .where(and(
        eq(workshopEnrollments.workshopId, workshopId),
        eq(workshopEnrollments.status, 'ENROLLED')
      ));

    // Get files
    const files = await db
      .select()
      .from(workshopFiles)
      .where(eq(workshopFiles.workshopId, workshopId))
      .orderBy(desc(workshopFiles.createdAt));

    return {
      workshop,
      enrollmentCount: enrollments.length,
      files,
    };
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return { error: 'Failed to fetch workshop' };
  }
}

// Enroll in Workshop (Students)
export async function enrollInWorkshop(workshopId: number) {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'You must be logged in to enroll' };
    }

    // Check if workshop exists and is published
    const [workshop] = await db
      .select()
      .from(workshops)
      .where(eq(workshops.id, workshopId));

    if (!workshop) {
      return { error: 'Workshop not found' };
    }

    if (workshop.status !== 'PUBLISHED') {
      return { error: 'This workshop is not available for enrollment' };
    }

    // Check if already enrolled
    const [existing] = await db
      .select()
      .from(workshopEnrollments)
      .where(and(
        eq(workshopEnrollments.workshopId, workshopId),
        eq(workshopEnrollments.userId, user.id)
      ));

    if (existing) {
      return { error: 'You are already enrolled in this workshop' };
    }

    // Check capacity
    if (workshop.capacity) {
      const enrollments = await db
        .select()
        .from(workshopEnrollments)
        .where(and(
          eq(workshopEnrollments.workshopId, workshopId),
          eq(workshopEnrollments.status, 'ENROLLED')
        ));

      if (enrollments.length >= workshop.capacity) {
        return { error: 'This workshop is full' };
      }
    }

    // Create enrollment
    await db.insert(workshopEnrollments).values({
      workshopId,
      userId: user.id,
      status: 'ENROLLED',
    });

    revalidatePath('/dashboard/workshops');

    return { success: true };
  } catch (error) {
    console.error('Error enrolling in workshop:', error);
    return { error: 'Failed to enroll in workshop' };
  }
}

// Cancel Enrollment (Students)
export async function cancelEnrollment(workshopId: number) {
  try {
    const user = await getUser();
    if (!user) {
      return { error: 'Unauthorized' };
    }

    await db
      .update(workshopEnrollments)
      .set({ status: 'CANCELLED' })
      .where(and(
        eq(workshopEnrollments.workshopId, workshopId),
        eq(workshopEnrollments.userId, user.id)
      ));

    revalidatePath('/dashboard/workshops');

    return { success: true };
  } catch (error) {
    console.error('Error cancelling enrollment:', error);
    return { error: 'Failed to cancel enrollment' };
  }
}

// Get User's Enrollments
export async function getUserEnrollments() {
  try {
    const user = await getUser();
    if (!user) {
      return { enrollments: [] };
    }

    const enrollments = await db
      .select({
        id: workshopEnrollments.id,
        status: workshopEnrollments.status,
        createdAt: workshopEnrollments.createdAt,
        workshop: workshops,
      })
      .from(workshopEnrollments)
      .leftJoin(workshops, eq(workshopEnrollments.workshopId, workshops.id))
      .where(eq(workshopEnrollments.userId, user.id))
      .orderBy(desc(workshops.startsAt));

    return { enrollments };
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return { enrollments: [] };
  }
}

// Upload Workshop File (Admin only)
export async function uploadWorkshopFile(workshopId: number, fileName: string, fileUrl: string, fileSize?: number, fileType?: string) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
    }

    const [file] = await db.insert(workshopFiles).values({
      workshopId,
      fileName,
      fileUrl,
      fileSize: fileSize || null,
      fileType: fileType || null,
      uploadedBy: user.id,
    }).returning();

    revalidatePath(`/dashboard/workshops/${workshopId}`);

    return { success: true, file };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file' };
  }
}

// Delete Workshop File (Admin only)
export async function deleteWorkshopFile(fileId: number) {
  try {
    const user = await getUser();
    if (!user || user.role !== 'ADMIN') {
      return { error: 'Unauthorized' };
    }

    await db.delete(workshopFiles).where(eq(workshopFiles.id, fileId));

    revalidatePath('/dashboard/workshops');

    return { success: true };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { error: 'Failed to delete file' };
  }
}
