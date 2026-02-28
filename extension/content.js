(() => {
  const WIDGET_ID = 'trustlayer-widget-root';
  if (document.getElementById(WIDGET_ID)) return;

  const COLORS = {
    safe: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    card: '#111827',
    bg: '#0B0F17',
    primary: '#4F46E5'
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

  let score = 76;
  let expanded = false;

  const root = document.createElement('div');
  root.id = WIDGET_ID;
  root.style.position = 'fixed';
  root.style.right = '18px';
  root.style.bottom = '18px';
  root.style.zIndex = '2147483647';
  root.style.fontFamily =
    "ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,'Apple Color Emoji','Segoe UI Emoji'";

  const style = document.createElement('style');
  style.textContent = `
    #${WIDGET_ID} .tlw {
      width: 210px;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px rgba(0,0,0,0.35);
      transform: translateZ(0);
    }
    #${WIDGET_ID} .tlwHeader {
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:10px;
      padding: 12px 12px;
      cursor: pointer;
      user-select:none;
    }
    #${WIDGET_ID} .tlwTitle {
      font-weight: 800;
      letter-spacing: 0.2px;
      font-size: 13px;
      color: rgba(255,255,255,0.95);
      display:flex;
      align-items:center;
      gap:8px;
    }
    #${WIDGET_ID} .tlwMark {
      width: 26px;
      height: 26px;
      border-radius: 12px;
      display:grid;
      place-items:center;
      background: rgba(17,24,39,0.55);
      border: 1px solid rgba(255,255,255,0.10);
      font-weight: 900;
    }
    #${WIDGET_ID} .tlwScore {
      font-weight: 900;
      font-size: 13px;
      color: rgba(255,255,255,0.95);
    }
    #${WIDGET_ID} .tlwSub {
      margin-top: 2px;
      font-size: 11px;
      color: rgba(255,255,255,0.75);
    }
    #${WIDGET_ID} .tlwBody {
      padding: 12px;
      background: rgba(11,15,23,0.62);
      border-top: 1px solid rgba(255,255,255,0.10);
      display:none;
    }
    #${WIDGET_ID} .tlwBody.open { display:block; }
    #${WIDGET_ID} .tlwRow {
      display:flex;
      align-items:flex-start;
      gap:10px;
      padding: 10px;
      border-radius: 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      margin-top: 10px;
    }
    #${WIDGET_ID} .tlwDot {
      width:10px;height:10px;border-radius:999px;margin-top:4px;
      box-shadow: 0 0 0 2px rgba(255,255,255,0.10);
      flex: 0 0 auto;
    }
    #${WIDGET_ID} .tlwRow b { display:block; font-size:12px; color: rgba(255,255,255,0.9); }
    #${WIDGET_ID} .tlwRow span { display:block; font-size:12px; color: rgba(255,255,255,0.65); margin-top: 2px; }
  `;

  const widget = document.createElement('div');
  widget.className = 'tlw';

  const header = document.createElement('div');
  header.className = 'tlwHeader';

  const titleWrap = document.createElement('div');
  titleWrap.style.display = 'flex';
  titleWrap.style.flexDirection = 'column';

  const title = document.createElement('div');
  title.className = 'tlwTitle';

  const mark = document.createElement('div');
  mark.className = 'tlwMark';
  mark.textContent = 'T';

  const titleText = document.createElement('div');
  titleText.textContent = 'TrustLayer';

  const sub = document.createElement('div');
  sub.className = 'tlwSub';
  sub.id = 'tlwStatus';

  title.appendChild(mark);
  title.appendChild(titleText);
  titleWrap.appendChild(title);
  titleWrap.appendChild(sub);

  const scoreEl = document.createElement('div');
  scoreEl.className = 'tlwScore';
  scoreEl.id = 'tlwScore';

  header.appendChild(titleWrap);
  header.appendChild(scoreEl);

  const body = document.createElement('div');
  body.className = 'tlwBody';
  body.id = 'tlwBody';

  const rows = [
    { label: 'SSL Status', value: 'Valid' },
    { label: 'Domain Trust', value: 'Medium Risk' },
    { label: 'Phishing Risk', value: 'Low Risk' },
    { label: 'AI Content Risk', value: 'Safe' }
  ];

  function renderRows() {
    body.innerHTML = '';
    const status = statusFromScore(score);
    const accent = colorFromStatus(status);
    rows.forEach((r) => {
      const row = document.createElement('div');
      row.className = 'tlwRow';
      const dot = document.createElement('div');
      dot.className = 'tlwDot';
      dot.style.background = accent;
      dot.style.boxShadow = `0 0 0 2px ${accent}22`;
      const text = document.createElement('div');
      const b = document.createElement('b');
      b.textContent = r.label;
      const s = document.createElement('span');
      s.textContent = r.value;
      text.appendChild(b);
      text.appendChild(s);
      row.appendChild(dot);
      row.appendChild(text);
      body.appendChild(row);
    });
  }

  function updateUI() {
    const status = statusFromScore(score);
    const accent = colorFromStatus(status);
    widget.style.background = accent;
    sub.textContent = `Score: ${score} • ${status}`;
    scoreEl.textContent = `${score}`;
    renderRows();
  }

  header.addEventListener('click', () => {
    expanded = !expanded;
    body.classList.toggle('open', expanded);
  });

  widget.appendChild(header);
  widget.appendChild(body);
  root.appendChild(style);
  root.appendChild(widget);
  document.documentElement.appendChild(root);

  updateUI();

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type === 'TRUSTLAYER_RESCAN') {
      const next = Number(msg.score);
      if (!Number.isNaN(next)) {
        score = Math.max(0, Math.min(100, next));
        updateUI();
      }
    }
  });
})();

