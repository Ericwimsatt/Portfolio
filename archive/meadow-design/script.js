/* ─── Meadow Generation ─── */

const SVG_NS = 'http://www.w3.org/2000/svg';

function generateGrass(svg, W, H, opts) {
  for (let i = 0; i < opts.count; i++) {
    const x = -50 + Math.random() * (W + 100);
    const h = opts.minH + Math.random() * (opts.maxH - opts.minH);
    const curve = (Math.random() - 0.5) * 50;
    const thick = opts.thickness[0] + Math.random() * (opts.thickness[1] - opts.thickness[0]);
    const hue = opts.hueBase + Math.random() * opts.hueRange;
    const sat = opts.satBase + Math.random() * opts.satRange;
    const lit = opts.litBase + Math.random() * opts.litRange;

    const outerG = document.createElementNS(SVG_NS, 'g');
    outerG.setAttribute('transform', `translate(${x}, ${H + 20})`);

    const animG = document.createElementNS(SVG_NS, 'g');
    animG.classList.add(opts.cls);

    const delay = Math.max(0, (x / W) * 2.5 + Math.random() * 0.3);
    const dur = opts.durRange[0] + Math.random() * (opts.durRange[1] - opts.durRange[0]);
    animG.style.animationDelay = `${delay}s`;
    animG.style.animationDuration = `${dur}s`;
    animG.style.transformOrigin = '0px 0px';

    const path = document.createElementNS(SVG_NS, 'path');
    const cpX = curve * 0.4;
    const cpY = -h * 0.45;
    path.setAttribute('d', `M 0 0 Q ${cpX.toFixed(1)} ${cpY.toFixed(1)} ${curve.toFixed(1)} ${(-h).toFixed(1)}`);
    path.setAttribute('stroke', `hsl(${hue.toFixed(0)}, ${sat.toFixed(0)}%, ${lit.toFixed(0)}%)`);
    path.setAttribute('stroke-width', thick.toFixed(1));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');

    animG.appendChild(path);
    outerG.appendChild(animG);
    svg.appendChild(outerG);
  }
}

function createDandelion(svg, x, y, h) {
  const posG = document.createElementNS(SVG_NS, 'g');
  posG.setAttribute('transform', `translate(${x}, ${y})`);

  const animG = document.createElementNS(SVG_NS, 'g');
  animG.classList.add('dandelion');
  animG.style.animation = 'sway 5s ease-in-out infinite';
  animG.style.animationDelay = `${Math.random() * 1.5}s`;
  animG.style.transformOrigin = '0px 0px';

  const stem = document.createElementNS(SVG_NS, 'path');
  stem.setAttribute('d', `M 0 0 Q 6 ${-h * 0.5} 4 ${-h}`);
  stem.setAttribute('stroke', '#5a8c4e');
  stem.setAttribute('stroke-width', '2.5');
  stem.setAttribute('fill', 'none');
  stem.setAttribute('stroke-linecap', 'round');
  animG.appendChild(stem);

  const leaf1 = document.createElementNS(SVG_NS, 'path');
  leaf1.setAttribute('d', `M 3 ${-h * 0.35} Q 18 ${-h * 0.4} 20 ${-h * 0.32}`);
  leaf1.setAttribute('stroke', '#5a8c4e');
  leaf1.setAttribute('stroke-width', '1.5');
  leaf1.setAttribute('fill', 'none');
  leaf1.setAttribute('stroke-linecap', 'round');
  animG.appendChild(leaf1);

  const leaf2 = document.createElementNS(SVG_NS, 'path');
  leaf2.setAttribute('d', `M 2 ${-h * 0.55} Q -14 ${-h * 0.6} -16 ${-h * 0.52}`);
  leaf2.setAttribute('stroke', '#5a8c4e');
  leaf2.setAttribute('stroke-width', '1.5');
  leaf2.setAttribute('fill', 'none');
  leaf2.setAttribute('stroke-linecap', 'round');
  animG.appendChild(leaf2);

  const base = document.createElementNS(SVG_NS, 'circle');
  base.setAttribute('cx', '4');
  base.setAttribute('cy', `${-h}`);
  base.setAttribute('r', '3');
  base.setAttribute('fill', '#c8b890');
  animG.appendChild(base);

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const len = 8 + Math.random() * 10;
    const ex = 4 + Math.cos(angle) * len;
    const ey = -h + Math.sin(angle) * len;

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', '4');
    line.setAttribute('y1', `${-h}`);
    line.setAttribute('x2', ex.toFixed(1));
    line.setAttribute('y2', ey.toFixed(1));
    line.setAttribute('stroke', '#e8e0c8');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.5');
    animG.appendChild(line);

    const puff = document.createElementNS(SVG_NS, 'circle');
    puff.setAttribute('cx', ex.toFixed(1));
    puff.setAttribute('cy', ey.toFixed(1));
    puff.setAttribute('r', (1.5 + Math.random() * 1).toFixed(1));
    puff.setAttribute('fill', '#f0ecd8');
    puff.setAttribute('opacity', '0.6');
    animG.appendChild(puff);
  }

  posG.appendChild(animG);
  svg.appendChild(posG);
}

function createWildflower(svg, x, y, h, color) {
  const posG = document.createElementNS(SVG_NS, 'g');
  posG.setAttribute('transform', `translate(${x}, ${y})`);

  const animG = document.createElementNS(SVG_NS, 'g');
  animG.classList.add('wildflower');
  animG.style.animation = 'sway 4s ease-in-out infinite';
  animG.style.animationDelay = `${Math.random() * 1.5}s`;
  animG.style.transformOrigin = '0px 0px';

  const stem = document.createElementNS(SVG_NS, 'path');
  stem.setAttribute('d', `M 0 0 Q 3 ${-h * 0.5} 0 ${-h}`);
  stem.setAttribute('stroke', '#5a8c4e');
  stem.setAttribute('stroke-width', '2');
  stem.setAttribute('fill', 'none');
  stem.setAttribute('stroke-linecap', 'round');
  animG.appendChild(stem);

  const leaf = document.createElementNS(SVG_NS, 'ellipse');
  leaf.setAttribute('cx', '10');
  leaf.setAttribute('cy', `${-h * 0.45}`);
  leaf.setAttribute('rx', '8');
  leaf.setAttribute('ry', '3');
  leaf.setAttribute('fill', '#5a9c4c');
  leaf.setAttribute('transform', `rotate(-25, 10, ${-h * 0.45})`);
  animG.appendChild(leaf);

  const leaf2 = document.createElementNS(SVG_NS, 'ellipse');
  leaf2.setAttribute('cx', '-8');
  leaf2.setAttribute('cy', `${-h * 0.7}`);
  leaf2.setAttribute('rx', '7');
  leaf2.setAttribute('ry', '2.5');
  leaf2.setAttribute('fill', '#5a9c4c');
  leaf2.setAttribute('transform', `rotate(20, -8, ${-h * 0.7})`);
  animG.appendChild(leaf2);

  const petalPositions = [[0, -8], [7, -3], [5, 5], [-5, 5], [-7, -3]];
  for (const [px, py] of petalPositions) {
    const petal = document.createElementNS(SVG_NS, 'circle');
    petal.setAttribute('cx', px.toString());
    petal.setAttribute('cy', (-h + py).toString());
    petal.setAttribute('r', '5');
    petal.setAttribute('fill', color);
    petal.setAttribute('opacity', '0.9');
    animG.appendChild(petal);
  }

  const center = document.createElementNS(SVG_NS, 'circle');
  center.setAttribute('cx', '0');
  center.setAttribute('cy', `${-h}`);
  center.setAttribute('r', '3.5');
  center.setAttribute('fill', '#ffd93d');
  animG.appendChild(center);

  posG.appendChild(animG);
  svg.appendChild(posG);
}

function initMeadow() {
  const container = document.getElementById('meadow');
  if (!container) return;

  const svg = document.createElementNS(SVG_NS, 'svg');
  Object.assign(svg.style, { width: '100%', height: '100%', display: 'block' });
  container.appendChild(svg);

  const W = window.innerWidth;
  const H = window.innerHeight;

  generateGrass(svg, W, H, {
    count: 100, minH: H * 0.08, maxH: H * 0.25,
    cls: 'grass-blade', durRange: [2.5, 4],
    hueBase: 100, hueRange: 40, satBase: 35, satRange: 30,
    litBase: 22, litRange: 25, thickness: [2, 5]
  });

  generateGrass(svg, W, H, {
    count: 50, minH: H * 0.12, maxH: H * 0.3,
    cls: 'grass-blade-bg', durRange: [3.5, 5.5],
    hueBase: 110, hueRange: 30, satBase: 30, satRange: 20,
    litBase: 18, litRange: 15, thickness: [2, 4]
  });

  createDandelion(svg, W * 0.1, H * 0.85, H * 0.18);
  createDandelion(svg, W * 0.75, H * 0.82, H * 0.16);
  createDandelion(svg, W * 0.42, H * 0.88, H * 0.14);

  createWildflower(svg, W * 0.18, H * 0.9, H * 0.12, '#ff6b9d');
  createWildflower(svg, W * 0.55, H * 0.87, H * 0.13, '#6bc9ff');
  createWildflower(svg, W * 0.82, H * 0.89, H * 0.11, '#ffd93d');
  createWildflower(svg, W * 0.3, H * 0.92, H * 0.1, '#9b59b6');
  createWildflower(svg, W * 0.65, H * 0.91, H * 0.12, '#ff6b9d');
  createWildflower(svg, W * 0.22, H * 0.86, H * 0.13, '#fff');
}

document.addEventListener('DOMContentLoaded', initMeadow);

/* ─── Desk Portfolio — Modal Logic ─── */

const overlay = document.getElementById('overlay');

/* Open a modal by id */
function openModal(id) {
  const target = document.getElementById(id);
  if (!target) return;

  // Hide any currently open modal
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));

  // Show overlay + target modal
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  target.classList.add('active');

  // Move focus to the close button for accessibility
  const closeBtn = target.querySelector('.modal-x');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);

  // Prevent body scroll while modal is open
  document.body.style.overflow = 'hidden';
}

/* Close any open modal */
function closeModal() {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ── Desk item click → open modal ── */
document.querySelectorAll('.desk-item[data-modal]').forEach(item => {
  item.addEventListener('click', () => openModal(item.dataset.modal));
});

/* ── Close button (×) on each modal ── */
document.querySelectorAll('.modal-x').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
});

/* ── Click the dim overlay backdrop to close ── */
overlay.addEventListener('click', (e) => {
  // Only close if clicking the overlay itself, not a modal child
  if (e.target === overlay) closeModal();
});

/* ── Escape key to close ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


