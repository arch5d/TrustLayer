export const trustScore = 82;

export const scanHistory = [
  {
    id: 's1',
    url: 'https://login-secure-portal.example',
    type: 'Website',
    score: 41,
    status: 'Dangerous',
    time: '2 min ago'
  },
  {
    id: 's2',
    url: 'https://example.com',
    type: 'Website',
    score: 92,
    status: 'Safe',
    time: '18 min ago'
  },
  {
    id: 's3',
    url: 'Email: “Verify your account now…”',
    type: 'Email',
    score: 58,
    status: 'Suspicious',
    time: '1 hr ago'
  },
  {
    id: 's4',
    url: 'https://cdn-assets.example/media/clip.mp4',
    type: 'Media',
    score: 77,
    status: 'Safe',
    time: '3 hr ago'
  },
  {
    id: 's5',
    url: 'Paste content: “Your invoice is attached…”',
    type: 'Content',
    score: 63,
    status: 'Suspicious',
    time: 'Yesterday'
  }
];

export const chartData = [
  { name: 'Mon', score: 71 },
  { name: 'Tue', score: 74 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 79 },
  { name: 'Fri', score: 83 },
  { name: 'Sat', score: 82 },
  { name: 'Sun', score: 86 }
];

export function statusFromScore(score) {
  if (score >= 75) return 'Safe';
  if (score >= 50) return 'Suspicious';
  return 'Dangerous';
}

export function colorFromStatus(status) {
  if (status === 'Safe') return 'safe';
  if (status === 'Suspicious') return 'warning';
  return 'danger';
}

