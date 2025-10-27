'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, CheckCircle, XCircle } from 'lucide-react';
import { enrollInWorkshop, cancelEnrollment, getUserEnrollments } from '@/lib/actions/workshops';
import Link from 'next/link';

async function fetchWorkshops() {
  try {
    const res = await fetch('/api/workshops', { cache: 'no-store' });
    if (!res.ok) return [] as any[];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [] as any[];
  }
}

export default function DashboardWorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [workshopsData, enrollmentsData] = await Promise.all([
      fetchWorkshops(),
      getUserEnrollments(),
    ]);
    setWorkshops(workshopsData);
    setEnrollments(enrollmentsData.enrollments || []);
    setLoading(false);
  };

  const handleEnroll = async (workshopId: number) => {
    const result = await enrollInWorkshop(workshopId);
    if (result.error) {
      alert(result.error);
    } else {
      await loadData();
    }
  };

  const handleCancel = async (workshopId: number) => {
    if (!confirm('Are you sure you want to cancel your enrollment?')) return;
    const result = await cancelEnrollment(workshopId);
    if (result.error) {
      alert(result.error);
    } else {
      await loadData();
    }
  };

  const isEnrolled = (workshopId: number) => {
    return enrollments.some(
      e => e.workshop?.id === workshopId && e.status === 'ENROLLED'
    );
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Workshops</h1>
        <p className="text-gray-600">Browse and enroll in available workshops</p>
      </div>

      {/* My Enrollments */}
      {enrollments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">My Enrolled Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.filter(e => e.status === 'ENROLLED').map((enrollment) => {
              const w = enrollment.workshop;
              if (!w) return null;
              return (
                <Card key={enrollment.id} className="border-purple-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{w.title}</CardTitle>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm mb-4">
                      {w.startsAt && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(w.startsAt).toLocaleDateString('de-DE')}
                        </div>
                      )}
                      {w.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {w.location} {w.room && `- ${w.room}`}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700"
                      onClick={() => handleCancel(w.id)}
                    >
                      Cancel Enrollment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Workshops */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Workshops</h2>
        {workshops.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No workshops available at the moment. Check back soon!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshops.map((w) => {
              const enrolled = isEnrolled(w.id);
              return (
                <Card key={w.id} className={enrolled ? 'border-purple-200 bg-purple-50' : ''}>
                  <CardHeader>
                    <CardTitle className="text-lg">{w.title}</CardTitle>
                    {enrolled && (
                      <span className="text-xs text-purple-700 font-medium">
                        ✓ Enrolled
                      </span>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {w.description || 'No description available'}
                    </p>
                    <div className="space-y-2 text-sm mb-4">
                      {w.startsAt && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(w.startsAt).toLocaleDateString('de-DE')}
                        </div>
                      )}
                      {w.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {w.location}
                        </div>
                      )}
                      {w.room && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          Room: {w.room}
                        </div>
                      )}
                      {w.capacity && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          Capacity: {w.capacity}
                        </div>
                      )}
                    </div>
                    {!enrolled ? (
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleEnroll(w.id)}
                      >
                        Enroll Now
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleCancel(w.id)}
                      >
                        Cancel Enrollment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


