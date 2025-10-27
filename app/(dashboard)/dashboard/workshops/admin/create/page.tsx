'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createWorkshop } from '@/lib/actions/workshops';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateWorkshopPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await createWorkshop(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/dashboard/workshops/admin');
    }
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
          <CardTitle>Create New Workshop</CardTitle>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endsAt">End Date & Time</Label>
                <Input
                  id="endsAt"
                  name="endsAt"
                  type="datetime-local"
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
                  placeholder="e.g., Mädea, Berlin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  name="room"
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
                placeholder="Maximum number of participants (leave empty for unlimited)"
              />
            </div>

            {/* Meeting URL */}
            <div className="space-y-2">
              <Label htmlFor="meetingUrl">Meeting URL (Optional)</Label>
              <Input
                id="meetingUrl"
                name="meetingUrl"
                type="url"
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
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <Label htmlFor="isPublic" className="cursor-pointer">
                Display on public website
              </Label>
            </div>
            <p className="text-sm text-gray-500 -mt-4 ml-6">
              When checked, this workshop will be visible on the public workshops page
            </p>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? 'Creating...' : 'Create Workshop'}
              </Button>
              <Link href="/dashboard/workshops/admin">
                <Button type="button" variant="outline" disabled={loading}>
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
