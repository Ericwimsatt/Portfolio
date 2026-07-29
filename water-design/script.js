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
    this.maxR = 80 + Math.random() * 60;
    this.life = 1;
    this.decay = 0.015 + Math.random() * 0.01;
  }

  update() {
    this.r += 2;
    this.life -= this.decay;
    if (this.life <= 0) this.life = 0;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(180, 230, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(180, 230, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
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
mouseBubble.r = 16;
mouseBubble.alpha = 0.5;

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
  const time = Date.now() * 0.0003;
  ctx.fillStyle = 'rgba(10, 61, 92, 0.3)';
  ctx.fillRect(0, 0, W, H);

  for (let y = 0; y < H; y += 8) {
    for (let x = 0; x < W; x += 8) {
      const val = Math.sin(x * 0.008 + time) * Math.cos(y * 0.006 + time * 0.7) +
                  Math.sin(x * 0.015 + y * 0.01 + time * 1.2) * 0.5 +
                  Math.sin(y * 0.012 - time * 0.5) * 0.3;
      const alpha = (val + 1.5) / 3 * 0.04;
      if (alpha > 0.01) {
        ctx.fillStyle = `rgba(150, 220, 255, ${alpha})`;
        ctx.fillRect(x, y, 8, 8);
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    const ly = (Math.sin(time * 0.5 + i * 2) * 0.3 + 0.5) * H;
    const lx = (Math.cos(time * 0.3 + i * 1.5) * 0.3 + 0.5) * W;
    const gradient = ctx.createRadialGradient(lx, ly, 0, lx, ly, 200);
    gradient.addColorStop(0, 'rgba(100, 200, 255, 0.03)');
    gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(lx, ly, 200, 0, Math.PI * 2);
    ctx.fill();
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
    mouseBubble.draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();