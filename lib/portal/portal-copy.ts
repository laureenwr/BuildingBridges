export function portalText(isDe: boolean, en: string, de: string) {
  return isDe ? de : en;
}

export function portalRoleLabel(isDe: boolean, role: string) {
  const value = role.trim().toUpperCase();
  if (value === 'ADMIN' || role === 'Admin') return 'Admin';
  if (value === 'MENTOR' || role === 'Mentor' || role === 'Mentor:in') {
    return isDe ? 'Mentor:in' : 'Mentor';
  }
  if (
    value === 'STUDENT' ||
    value === 'MENTEE' ||
    role === 'Participant' ||
    role === 'Teilnehmer:in' ||
    role === 'Mentee'
  ) {
    return isDe ? 'Teilnehmer:in' : 'Participant';
  }
  return isDe ? 'Teilnehmer:in' : 'Participant';
}
