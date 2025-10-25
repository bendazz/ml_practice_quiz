// Small utility: sigmoid
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// Reveal/Hide answer buttons
function setupRevealButtons() {
  document.querySelectorAll('.reveal-btn').forEach((btn) => {
    const targetId = btn.getAttribute('aria-controls');
    const answer = document.getElementById(targetId);
    if (!answer) return;

    const updateState = (show) => {
      if (show) {
        answer.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Hide answer';
      } else {
        answer.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Reveal answer';
      }
    };

    // Start hidden
    updateState(false);

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      updateState(!expanded);
    });
  });
}

// Shuffle the order of question sections while keeping the footer last
function shuffleQuestions() {
  const container = document.querySelector('main.container');
  if (!container) return;
  const footer = container.querySelector('.site-footer');
  const sections = Array.from(container.querySelectorAll('section.question'));
  if (!footer || sections.length < 2) return;

  // Fisher-Yates shuffle
  for (let i = sections.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sections[i], sections[j]] = [sections[j], sections[i]];
  }

  // Reinsert sections before the footer in the new order
  sections.forEach((sec) => container.insertBefore(sec, footer));
}

// Renumber question headings to reflect current DOM order
function renumberQuestions() {
  const sections = document.querySelectorAll('section.question');
  sections.forEach((sec, idx) => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    const original = h2.textContent || '';
    const withoutPrefix = original.replace(/^\s*\d+\)\s*/, '');
    h2.textContent = `${idx + 1}) ${withoutPrefix}`;
  });
}

// Sigmoid chart + slider
function setupSigmoidExplorer() {
  const zSlider = document.getElementById('zSlider');
  const zVal = document.getElementById('zVal');
  const pVal = document.getElementById('pVal');
  const ctx = document.getElementById('sigmoidChart');
  if (!zSlider || !zVal || !pVal || !ctx || !window.Chart) return;

  // Prepare data for the curve
  const xs = [];
  const ys = [];
  for (let z = -6; z <= 6.0001; z += 0.1) {
    xs.push(Number(z.toFixed(1)));
    ys.push(sigmoid(z));
  }

  // Initial marker
  let markerZ = 0;
  let markerP = sigmoid(markerZ);

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xs,
      datasets: [
        {
          label: 'σ(z)',
          data: ys,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
          fill: true,
          tension: 0.12,
          pointRadius: 0,
          borderWidth: 2,
        },
        {
          label: 'Point',
          data: xs.map((x) => ({ x, y: x === markerZ ? markerP : null })),
          borderColor: '#ef4444',
          backgroundColor: '#ef4444',
          pointRadius: 5,
          showLine: false,
          parsing: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          title: { display: true, text: 'z' },
          ticks: { maxTicksLimit: 13 },
        },
        y: {
          title: { display: true, text: 'σ(z)' },
          min: 0,
          max: 1,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
  });

  function updateExplorer(z) {
    const zNum = Number(z);
    const p = sigmoid(zNum);
    zVal.textContent = zNum.toFixed(1);
    pVal.textContent = p.toFixed(3);

    // Update the marker dataset
    const markerDataset = chart.data.datasets[1];
    markerDataset.data = xs.map((x) => ({ x, y: x === Number(zNum.toFixed(1)) ? p : null }));
    chart.update();
  }

  // Init & bind
  updateExplorer(zSlider.value);
  zSlider.addEventListener('input', (e) => updateExplorer(e.target.value));
}

window.addEventListener('DOMContentLoaded', () => {
  shuffleQuestions();
  renumberQuestions();
  setupRevealButtons();
  setupSigmoidExplorer();
});
