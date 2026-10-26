/* Cabeçalho transparente apenas enquanto a hero está visível. */
(() => {
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero-editorial');
  if (!nav || !hero) return;
  let scheduled = false;
  function update() {
    const threshold = Math.max(0, hero.getBoundingClientRect().bottom - nav.offsetHeight);
    nav.classList.toggle('nav-scrolled', threshold <= 0);
    scheduled = false;
  }
  function requestUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  addEventListener('scroll', requestUpdate, {passive:true});
  addEventListener('resize', requestUpdate, {passive:true});
  update();
})();
