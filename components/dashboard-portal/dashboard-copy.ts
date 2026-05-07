/** Static copy and dummy payloads for portal dashboards until backend wiring. */

export const dummyPendingUsers = [
  { id: '1', user: 'Amina Ali', role: 'Mentee', joinedOn: '24 May 2025' },
  { id: '2', user: 'Sara Hassan', role: 'Mentor', joinedOn: '23 May 2025' },
  { id: '3', user: 'Leyla Mahmood', role: 'Researcher', joinedOn: '22 May 2025' },
  { id: '4', user: 'Maya Ibrahim', role: 'Mentee', joinedOn: '21 May 2025' },
] as const;

export const dummyStoriesForReview = [
  { id: 's1', title: 'Finding My Path', submittedBy: 'Amina Ali', submittedOn: '24 May 2025' },
  { id: 's2', title: 'University Life Challenges', submittedBy: 'Sara Hassan', submittedOn: '23 May 2025' },
  { id: 's3', title: 'From Cairo to Charité', submittedBy: 'Nour Hassan', submittedOn: '22 May 2025' },
  { id: 's4', title: 'Building Confidence', submittedBy: 'Leyla Mahmood', submittedOn: '22 May 2025' },
  { id: 's5', title: 'My Mentorship Journey', submittedBy: 'Maya Ibrahim', submittedOn: '21 May 2025' },
] as const;

export const dummyEvents = [
  {
    id: 'e1',
    title: 'Storytelling Workshop',
    date: '12 June 2025',
    time: '16:00 – 18:00',
    format: 'Online',
  },
  {
    id: 'e2',
    title: 'Mentor Meet-up',
    date: '18 June 2025',
    time: '17:30 – 19:00',
    format: 'Berlin Hub',
  },
  {
    id: 'e3',
    title: 'Digital Skills Training',
    date: '25 June 2025',
    time: '15:00 – 17:00',
    format: 'Online',
  },
] as const;
