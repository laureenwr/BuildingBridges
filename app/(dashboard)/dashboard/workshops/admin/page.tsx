'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import Link from 'next/link';
import { deleteWorkshop } from '@/lib/actions/workshops';

async function fetchWorkshops() {
  const res = await fetch('/api/workshops', { cache: 'no-store' });
  const json = await res.json();
  return json.data || [];
}

export default function AdminWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    setLoading(true);
    const data = await fetchWorkshops();
    setWorkshops(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this workshop?')) return;

    const result = await deleteWorkshop(id);
    if (result.success) {
      await loadWorkshops();
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workshop Management</h1>
        <Link href="/dashboard/workshops/admin/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Workshop
          </Button>
        </Link>
      </div>

      {workshops.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No workshops yet. Create your first workshop to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {workshops.map((workshop) => (
            <Card key={workshop.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{workshop.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        workshop.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                        workshop.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {workshop.status}
                      </span>
                      {workshop.isPublic && (
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                          PUBLIC
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/workshops/admin/edit/${workshop.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(workshop.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{workshop.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date:</span><br/>
                    {workshop.startsAt ? new Date(workshop.startsAt).toLocaleDateString('de-DE') : 'TBA'}
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span><br/>
                    {workshop.location || 'TBA'}
                  </div>
                  <div>
                    <span className="text-gray-500">Room:</span><br/>
                    {workshop.room || 'TBA'}
                  </div>
                  <div>
                    <span className="text-gray-500">Capacity:</span><br/>
                    {workshop.capacity || 'Unlimited'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
