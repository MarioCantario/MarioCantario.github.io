(() => {
  const screen = document.getElementById('loadingScreen');
  if (!screen) return;
  try {
    if (localStorage.getItem('overseer-intro-seen') === '1') screen.classList.add('intro-short');
    localStorage.setItem('overseer-intro-seen', '1');
  } catch { /* Startup must work when browser storage is unavailable. */ }
  const skip = () => {
    if (screen.classList.contains('intro-3d')) {
      window.OverseerIntro?.still?.();
      return;
    }
    screen.classList.add('intro-static');
    const button = screen.querySelector('.startup-skip');
    if (button) button.hidden = true;
  };
  screen.querySelector('.startup-skip')?.addEventListener('click', skip);
  document.addEventListener('keydown', event => { if (event.key === 'Escape'&&!screen.classList.contains('is-hidden')) skip(); });
  // Boot, authentication and errors remain owned by app.js. No minimum delay.
  window.OverseerIntro = { finish() { screen.classList.add('is-hidden'); }, replay() {
    screen.classList.remove('is-hidden', 'intro-static', 'intro-short');
    screen.querySelector('.startup-skip').hidden = false;
    screen.getAnimations({subtree:true}).forEach(animation => { animation.currentTime=0; animation.play(); });
  } };
})();
