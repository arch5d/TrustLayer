const COLORS = {
  primary: '#4F46E5',
  safe: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444'
};

function statusFromScore(score) {
  if (score >= 75) return 'Safe';
  if (score >= 50) return 'Suspicious';
  return 'Dangerous';
}

function colorFromStatus(status) {
  if (status === 'Safe') return COLORS.safe;
  if (status === 'Suspicious') return COLORS.warning;
  return COLORS.danger;
}

function setRing(score, color) {
  const circle = document.getElementById('ringProgress');
  const r = 44;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = c - (clamped / 100) * c;
  circle.style.strokeDasharray = `${c} ${c}`;
  circle.style.strokeDashoffset = `${offset}`;
  circle.style.stroke = color;
}

function updateUI(score) {
  const status = statusFromScore(score);
  const badge = document.getElementById('statusBadge');
  const statusText = document.getElementById('statusText');
  const scoreText = document.getElementById('scoreText');

  scoreText.textContent = String(score);
  badge.textContent = status.toUpperCase();

  const color = colorFromStatus(status);
  badge.style.borderColor = `${color}55`;
  badge.style.background = `${color}1A`;
  badge.style.color = color;
  statusText.textContent = status === 'Safe' ? 'Safe Website' : status === 'Suspicious' ? 'Suspicious Website' : 'Dangerous Website';

  setRing(score, color);
}

function randomScore() {
  return Math.floor(35 + Math.random() * 60);
}

async function sendRescanToActiveTab(score) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: 'TRUSTLAYER_RESCAN', score });
  } catch (e) {
    // ignore: prototype-only
  }
}

document.getElementById('scanBtn').addEventListener('click', async () => {
  const score = randomScore();
  updateUI(score);
  await sendRescanToActiveTab(score);
});

document.getElementById('dashBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:5173/' });
});

// Init with example-like score
updateUI(76);

