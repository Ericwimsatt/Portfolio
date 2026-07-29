/* ─── Workbench Portfolio — Animations ─── */

gsap.registerPlugin(ScrollTrigger);

/* 1. Apply rotations via GSAP so it owns all transforms cleanly */
document.querySelectorAll('[data-rotate]').forEach(el => {
  gsap.set(el, { rotation: parseFloat(el.dataset.rotate) });
});

/* 2. Hover: lift + straighten for notes */
document.querySelectorAll('.note').forEach(note => {
  const rot = parseFloat(note.dataset.rotate || 0);

  note.addEventListener('mouseenter', () => {
    gsap.to(note, {
      rotation: 0,
      y: -6,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });

  note.addEventListener('mouseleave', () => {
    gsap.to(note, {
      rotation: rot,
      y: 0,
      duration: 0.28,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });
  });
});

/* 3. Legal pad hover */
document.querySelectorAll('.legal-pad').forEach(el => {
  const rot = parseFloat(el.dataset.rotate || 0);
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { rotation: 0, y: -4, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { rotation: rot, y: 0, duration: 0.28, ease: 'power2.inOut', overwrite: 'auto' });
  });
});

/* 4. Business card hover */
document.querySelectorAll('.business-card').forEach(el => {
  const rot = parseFloat(el.dataset.rotate || 0);
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { rotation: 0, y: -5, duration: 0.22, ease: 'power2.out', overwrite: 'auto' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { rotation: rot, y: 0, duration: 0.28, ease: 'power2.inOut', overwrite: 'auto' });
  });
});

/* 5. Page-load entrance — hero items drop onto the table */
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('.hero', {
    y: -55,
    opacity: 0,
    duration: 0.9,
    delay: 0.1
  })
  .from('.about', {
    y: -40,
    opacity: 0,
    duration: 0.8
  }, '-=0.6');

/* 6. Scroll reveals */
gsap.from('.legal-pad', {
  scrollTrigger: { trigger: '.legal-pad', start: 'top 90%' },
  y: 60,
  opacity: 0,
  duration: 0.85,
  ease: 'power2.out'
});

gsap.from('.proj-header', {
  scrollTrigger: { trigger: '#projects', start: 'top 90%' },
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out'
});

gsap.from('.proj', {
  scrollTrigger: { trigger: '.proj-grid', start: 'top 90%' },
  y: 45,
  opacity: 0,
  duration: 0.65,
  stagger: 0.08,
  ease: 'back.out(1.3)'
});

gsap.from('.business-card', {
  scrollTrigger: { trigger: '.bottom-row', start: 'top 90%' },
  x: -55,
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out'
});

gsap.from('.gh-note', {
  scrollTrigger: { trigger: '.bottom-row', start: 'top 90%' },
  x: 50,
  opacity: 0,
  duration: 0.8,
  delay: 0.1,
  ease: 'power2.out'
});
