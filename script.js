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

// Video embeds: fill in real YouTube video IDs here once uploaded (unlisted).
// Example: julefilm: 'dQw4w9WgXcQ'
const YOUTUBE_IDS = {
  julefilm: 'kuaJwlkg_Ho',
  nyhetspromo: 'ir1s-K_US9k',
};

document.querySelectorAll('[data-video-slot]').forEach(slot => {
  const id = YOUTUBE_IDS[slot.dataset.videoSlot];
  if (!id) return;
  slot.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}"
    title="${slot.dataset.videoSlot}" loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
});
