document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('is-open'));
});

// Lightbox for poster/gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.poster-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.querySelector('img').alt;
    lightbox.classList.add('is-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Accent color picker
const colorPicker = document.getElementById('colorPicker');
const colorToggle = document.getElementById('colorToggle');
const colorOptions = document.getElementById('colorOptions');
const DEFAULT_ACCENT = '#3b82f6';

function applyAccent(hex, save) {
  document.documentElement.style.setProperty('--accent', hex);
  colorOptions.querySelectorAll('.color-dot').forEach(dot => {
    dot.classList.toggle('is-active', dot.dataset.color.toLowerCase() === hex.toLowerCase());
  });
  if (save) {
    try { localStorage.setItem('accent-color', hex); } catch { /* private mode, ignore */ }
  }
}

let savedAccent = null;
try { savedAccent = localStorage.getItem('accent-color'); } catch { /* private mode, ignore */ }
applyAccent(savedAccent || DEFAULT_ACCENT, false);

colorToggle.addEventListener('click', () => {
  const open = colorPicker.classList.toggle('is-open');
  colorToggle.setAttribute('aria-expanded', open);
});

colorOptions.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', () => applyAccent(dot.dataset.color, true));
});

document.addEventListener('click', e => {
  if (!colorPicker.contains(e.target)) {
    colorPicker.classList.remove('is-open');
    colorToggle.setAttribute('aria-expanded', 'false');
  }
});
