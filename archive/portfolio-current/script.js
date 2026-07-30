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


