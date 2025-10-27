'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateWorkshop } from '@/lib/actions/workshops';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';

async function fetchWorkshop(id: string) {
  const res = await fetch(`/api/workshops/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default function EditWorkshopPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWorkshop();
  }, []);

  const loadWorkshop = async () => {
    const data = await fetchWorkshop(params.id);
    setWorkshop(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await updateWorkshop(parseInt(params.id), formData);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    } else {
      router.push('/dashboard/workshops/admin');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!workshop) {
    return <div className="p-8">Workshop not found</div>;
  }

  const formatDateForInput = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/workshops/admin">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workshops
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Workshop</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title *</Label>
              <Input
                id="title"
                name="title"
                required
                defaultValue={workshop.title}
                placeholder="e.g., Digital Storytelling Workshop"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={workshop.description || ''}
                placeholder="Describe what participants will learn..."
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startsAt">Start Date & Time</Label>
                <Input
                  id="startsAt"
                  name="startsAt"
                  type="datetime-local"
                  defaultValue={formatDateForInput(workshop.startsAt)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endsAt">End Date & Time</Label>
                <Input
                  id="endsAt"
                  name="endsAt"
                  type="datetime-local"
                  defaultValue={formatDateForInput(workshop.endsAt)}
                />
              </div>
            </div>

            {/* Location & Room */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={workshop.location || ''}
                  placeholder="e.g., Mädea, Berlin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  name="room"
                  defaultValue={workshop.room || ''}
                  placeholder="e.g., Room 101"
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                defaultValue={workshop.capacity || ''}
                placeholder="Maximum number of participants"
              />
            </div>

            {/* Meeting URL */}
            <div className="space-y-2">
              <Label htmlFor="meetingUrl">Meeting URL (Optional)</Label>
              <Input
                id="meetingUrl"
                name="meetingUrl"
                type="url"
                defaultValue={workshop.meetingUrl || ''}
                placeholder="https://zoom.us/j/..."
              />
            </div>

            {/* Materials URL */}
            <div className="space-y-2">
              <Label htmlFor="materialsUrl">Materials URL (Optional)</Label>
              <Input
                id="materialsUrl"
                name="materialsUrl"
                type="url"
                defaultValue={workshop.materialsUrl || ''}
                placeholder="https://..."
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={workshop.imageUrl || ''}
                placeholder="https://..."
              />
              <p className="text-sm text-gray-500">
                Workshop thumbnail or banner image
              </p>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={workshop.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Public Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                value="true"
                defaultChecked={workshop.isPublic}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <Label htmlFor="isPublic" className="cursor-pointer">
                Display on public website
              </Label>
            </div>

            {/* File Management Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Workshop Files</h3>
              <p className="text-sm text-gray-600 mb-4">
                Note: File upload functionality will be available after saving. You can add files from the workshop detail page.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {submitting ? 'Updating...' : 'Update Workshop'}
              </Button>
              <Link href="/dashboard/workshops/admin">
                <Button type="button" variant="outline" disabled={submitting}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
