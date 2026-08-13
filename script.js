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

const colors = ['#f0b84c', '#8f8fd9', '#e2604a', '#f7d38a'];

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

// Register-write log demo: typewriters a boot sequence, blinks the LED line
const regLog = document.getElementById('regLog');
const regLed = document.getElementById('regLed');

const regLines = [
  { text: 'RCC->IOPENR |= RCC_IOPENR_GPIOCEN;' },
  { text: 'GPIOC->MODER &= ~(3u << (6*2));' },
  { text: 'GPIOC->MODER |=  (1u << (6*2));' },
  { text: 'GPIOC->BSRR = GPIO_BSRR_BS6;', blink: 'on' },
  { text: 'GPIOC->BSRR = GPIO_BSRR_BR6;', blink: 'off' },
];

let lineIndex = 0;
let charIndex = 0;
let displayed = [];

function typeStep() {
  const line = regLines[lineIndex];
  if (charIndex === 0) displayed.push('');
  charIndex++;
  displayed[displayed.length - 1] = line.text.slice(0, charIndex);
  if (displayed.length > 5) displayed.shift();
  regLog.textContent = displayed.join('\n');

  if (charIndex >= line.text.length) {
    if (line.blink) regLed.classList.toggle('on', line.blink === 'on');
    charIndex = 0;
    lineIndex = (lineIndex + 1) % regLines.length;
    setTimeout(typeStep, 500);
  } else {
    setTimeout(typeStep, 28);
  }
}

if (regLog && regLed) typeStep();
