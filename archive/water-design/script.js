const overlay = document.getElementById('overlay');

function openModal(id) {
  const target = document.getElementById(id);
  if (!target) return;
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  target.classList.add('active');
  const closeBtn = target.querySelector('.modal-x');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
}

document.querySelectorAll('.desk-item[data-modal]').forEach(item => {
  item.addEventListener('click', () => openModal(item.dataset.modal));
});

document.querySelectorAll('.modal-x').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

let W, H;
const canvas = document.getElementById('water-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const ripples = [];
const bubbles = [];
const ambientBubbles = [];

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4 + Math.random() * 8;
    this.speed = 0.5 + Math.random() * 1.5;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.01 + Math.random() * 0.02;
    this.wobbleAmp = 0.3 + Math.random() * 0.8;
    this.alpha = 0.3 + Math.random() * 0.4;
    this.life = 1;
  }

  update() {
    this.y -= this.speed;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * this.wobbleAmp;
    if (this.y < -20) this.life = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha * this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(180, 230, 255, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(180, 230, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    ctx.restore();
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = 200 + Math.random() * 120;
    this.life = 1;
    this.decay = 0.008 + Math.random() * 0.005;
    this.rings = 3 + Math.floor(Math.random() * 2);
  }

  update() {
    this.r += 3.5;
    this.life -= this.decay;
    if (this.life <= 0) this.life = 0;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    for (let i = 0; i < this.rings; i++) {
      const ringR = this.r - i * 18;
      if (ringR <= 0) continue;
      const alpha = this.life * (0.5 - i * 0.12);
      if (alpha <= 0) continue;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = i === 0 ? 'rgba(200, 245, 255, 0.7)' : 'rgba(150, 220, 255, 0.35)';
      ctx.lineWidth = 3 - i * 0.5;
      ctx.stroke();
    }
    ctx.restore();
  }
}

class AmbientCaustic {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = -50 - Math.random() * 100;
    this.size = 40 + Math.random() * 100;
    this.speed = 0.3 + Math.random() * 0.5;
    this.phase = Math.random() * Math.PI * 2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.alpha = 0.04 + Math.random() * 0.06;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.phase + this.y * 0.01) * 0.5 + this.speedX;
    if (this.y > H + 50) this.reset();
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, 'rgba(150, 220, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 12; i++) {
  const c = new AmbientCaustic();
  c.y = Math.random() * H;
  ambientBubbles.push(c);
}

for (let i = 0; i < 20; i++) {
  const b = new Bubble(Math.random() * W, Math.random() * H);
  ambientBubbles.push(b);
}

const mouseBubble = new Bubble(-100, -100);
mouseBubble.r = 28;
mouseBubble.alpha = 0.7;

function drawMouseBubble(ctx) {
  if (!hasMouse) return;
  const x = mx, y = my;
  ctx.save();

  const glow = ctx.createRadialGradient(x, y, 0, x, y, 50);
  glow.addColorStop(0, 'rgba(200, 245, 255, 0.15)');
  glow.addColorStop(1, 'rgba(200, 245, 255, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(180, 235, 255, 0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(200, 245, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200, 245, 255, 0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x - 10, y - 10, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x - 6, y - 14, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fill();

  ctx.restore();
}

let mx = -100, my = -100;
let hasMouse = false;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  hasMouse = true;
});

document.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  mx = t.clientX;
  my = t.clientY;
  hasMouse = true;
}, { passive: true });

document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  mx = t.clientX;
  my = t.clientY;
  hasMouse = true;
}, { passive: true });

document.addEventListener('click', (e) => {
  const isModalOpen = overlay.classList.contains('active');
  if (isModalOpen) return;
  ripples.push(new Ripple(e.clientX, e.clientY));
});

function drawWaterTexture() {
  const time = Date.now() * 0.0005;
  ctx.fillStyle = 'rgba(10, 55, 85, 0.25)';
  ctx.fillRect(0, 0, W, H);

  for (let y = 0; y < H; y += 6) {
    for (let x = 0; x < W; x += 6) {
      const val = Math.sin(x * 0.01 + time * 1.2) * Math.cos(y * 0.008 + time * 0.9) +
                  Math.sin(x * 0.02 + y * 0.015 + time * 1.8) * 0.6 +
                  Math.sin(y * 0.015 - time * 0.7) * 0.4 +
                  Math.sin(x * 0.005 + y * 0.012 + time * 0.5) * 0.3;
      const alpha = (val + 2) / 4 * 0.07;
      if (alpha > 0.015) {
        ctx.fillStyle = `rgba(150, 230, 255, ${alpha})`;
        ctx.fillRect(x, y, 6, 6);
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    const ly = (Math.sin(time * 0.4 + i * 1.8) * 0.35 + 0.5) * H;
    const lx = (Math.cos(time * 0.25 + i * 1.3) * 0.35 + 0.5) * W;
    const gradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, 250);
    gradient.addColorStop(0, 'rgba(120, 220, 255, 0.04)');
    gradient.addColorStop(0.5, 'rgba(80, 180, 240, 0.02)');
    gradient.addColorStop(1, 'rgba(80, 180, 240, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(lx, ly, 250, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 3; i++) {
    const sx = (Math.sin(time * 0.15 + i * 2.2) * 0.4 + 0.5) * W;
    ctx.save();
    ctx.globalAlpha = 0.03 + Math.sin(time + i) * 0.01;
    const grad = ctx.createLinearGradient(sx, 0, sx + 60, 0);
    grad.addColorStop(0, 'rgba(200, 250, 255, 0)');
    grad.addColorStop(0.5, 'rgba(200, 250, 255, 0.04)');
    grad.addColorStop(1, 'rgba(200, 250, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(sx, 0, 60, H);
    ctx.restore();
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);

  drawWaterTexture();

  for (const c of ambientBubbles) {
    c.update();
    c.draw(ctx);
  }

  ripples.forEach(r => { r.update(); r.draw(ctx); });
  for (let i = ripples.length - 1; i >= 0; i--) {
    if (ripples[i].life <= 0) ripples.splice(i, 1);
  }

  if (hasMouse) {
    mouseBubble.x = mx;
    mouseBubble.y = my;
    drawMouseBubble(ctx);
  }

  requestAnimationFrame(animate);
}

animate();