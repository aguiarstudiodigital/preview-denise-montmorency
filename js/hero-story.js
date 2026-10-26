/* ASD V16 — progressive, persistent hero message, one-play video. */
(() => {
  const hero = document.querySelector('.hero-editorial');
  const video = document.getElementById('heroVideo');
  const story = document.getElementById('heroStory');
  if (!hero || !video || !story) return;
  const parts = Array.from(story.querySelectorAll('[data-hero-part]'));
  const mobile = matchMedia('(max-width:767px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let source = '';
  let token = 0;

  function revealThrough(index) {
    parts.forEach((part, i) => part.classList.toggle('is-visible', i <= index));
  }
  function finish() {
    revealThrough(parts.length - 1);
    hero.classList.add('hero-finished');
    video.pause();
  }
  function reset() {
    ++token;
    const thisRun = token;
    video.pause();
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.poster = mobile.matches ? video.dataset.posterMobile : video.dataset.posterDesktop;
    hero.classList.remove('hero-finished','hero-video-error');
    if (reduced.matches) {
      story.classList.remove('is-animating');
      video.removeAttribute('src');
      source = '';
      video.load();
      finish();
      return;
    }
    story.classList.add('is-animating');
    revealThrough(-1);
    const next = mobile.matches ? video.dataset.mobile : video.dataset.desktop;
    if (source !== next) {
      source = next;
      video.src = next;
      video.load();
    } else {
      try { video.currentTime = 0; } catch (_) {}
    }
    const attempt = video.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(() => {
        if (token !== thisRun || hero.classList.contains('hero-finished')) return;
        requestAnimationFrame(() => revealThrough(0));
      }).catch(() => {
        if (token !== thisRun) return;
        hero.classList.add('hero-video-error');
        finish();
      });
    } else {
      revealThrough(0);
    }
  }
  video.addEventListener('timeupdate', () => {
    if (hero.classList.contains('hero-finished')) return;
    const t = video.currentTime;
    revealThrough(t < 5.1 ? 0 : t < 11 ? 1 : 2);
    if (video.duration && t >= Math.min(video.duration - .12, 15.02)) finish();
  });
  video.addEventListener('ended', finish);
  video.addEventListener('error', () => {
    hero.classList.add('hero-video-error');
    finish();
  });
  if (mobile.addEventListener) mobile.addEventListener('change', reset);
  else mobile.addListener(reset);
  if (reduced.addEventListener) reduced.addEventListener('change', reset);
  else reduced.addListener(reset);
  reset();
})();
