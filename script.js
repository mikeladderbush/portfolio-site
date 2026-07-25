// Theme toggle, persisted in localStorage
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  iconSun.style.display = theme === 'dark' ? 'block' : 'none';
  iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
}

const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(stored || (prefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Tiny animated "scoreboard" demo: random pixels flicker on a matrix grid
const grid = document.getElementById('matrixGrid');
const COLS = 16, ROWS = 8;
const cells = [];
for (let i = 0; i < COLS * ROWS; i++) {
  const cell = document.createElement('div');
  cell.className = 'px';
  grid.appendChild(cell);
  cells.push(cell);
}

const colors = ['#5eead4', '#a78bfa', '#fb923c', '#f472b6'];

function flicker() {
  // dim everything slightly
  cells.forEach(c => {
    if (Math.random() < 0.08) c.style.background = '#131313';
  });
  // light a handful of random pixels
  const hits = 3 + Math.floor(Math.random() * 5);
  for (let i = 0; i < hits; i++) {
    const cell = cells[Math.floor(Math.random() * cells.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    cell.style.background = color;
  }
}

setInterval(flicker, 180);
