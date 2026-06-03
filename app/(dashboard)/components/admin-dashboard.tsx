'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Settings, Activity, UserPlus } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function AdminDashboard() {
  const { isDe } = useLanguage();
  const L = (en: string, de: string) => (isDe ? de : en);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{L('Admin Dashboard', 'Admin-Dashboard')}</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          {L('Add User', 'Nutzer:in hinzufügen')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{L('Total Users', 'Nutzer:innen gesamt')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">{L('+12% from last month', '+12 % zum Vormonat')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{L('Active Mentors', 'Aktive Mentor:innen')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">{L('+3 new this week', '+3 neu diese Woche')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{L('Students', 'Studierende')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">203</div>
            <p className="text-xs text-muted-foreground">{L('+15 new this month', '+15 neu diesen Monat')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              {L('User Management', 'Nutzerverwaltung')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {L(
                'Manage users, roles, and permissions across the platform.',
                'Nutzer:innen, Rollen und Berechtigungen auf der Plattform verwalten.'
              )}
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                {L('View All Users', 'Alle Nutzer:innen anzeigen')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {L('Manage Roles', 'Rollen verwalten')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {L('Pending Invitations', 'Ausstehende Einladungen')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              {L('System Activity', 'Systemaktivität')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {L(
                'Monitor platform activity and user engagement.',
                'Plattformaktivität und Engagement der Nutzer:innen überwachen.'
              )}
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                {L('View Activity Logs', 'Aktivitätsprotokolle anzeigen')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {L('System Reports', 'Systemberichte')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {L('Analytics Dashboard', 'Analytics-Dashboard')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            {L('Quick Actions', 'Schnellaktionen')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline">{L('Send Announcement', 'Ankündigung senden')}</Button>
            <Button variant="outline">{L('Export Data', 'Daten exportieren')}</Button>
            <Button variant="outline">{L('System Settings', 'Systemeinstellungen')}</Button>
            <Button variant="outline">{L('Backup Data', 'Daten sichern')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
