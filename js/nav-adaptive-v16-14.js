/* ASD V16.14 — avalia a secao efetivamente sob o cabecalho.
   Usa ponto de amostragem sob o menu, sem modificar o layout ou a hero. */
(() => {
  const nav=document.querySelector('.nav');
  const sections=[...document.querySelectorAll('header#inicio,main>section,footer.footer')];
  if (!nav || !sections.length) return;
  const toneById={inicio:'hero',olhar:'light',atuacao:'dark',denise:'light',abordagem:'dark',duvidas:'dark',contato:'dark'};
  nav.classList.add('nav-adaptive');
  let scheduled=false;
  function update(){
    scheduled=false;
    const sampleY=Math.min(nav.getBoundingClientRect().height*.65,50);
    let active=sections.find(s=>{const r=s.getBoundingClientRect();return r.top<=sampleY&&r.bottom>sampleY;});
    if (!active) {
      // Em limites ou durante a navegacao por ancora, usar a secao mais proxima.
      active=sections.reduce((best,s)=>Math.abs(s.getBoundingClientRect().top-sampleY)<Math.abs(best.getBoundingClientRect().top-sampleY)?s:best,sections[0]);
    }
    const tone=active.matches('footer')?'footer':(toneById[active.id]||'dark');
    if(nav.dataset.navTone!==tone)nav.dataset.navTone=tone;
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('load',schedule);
  document.addEventListener('DOMContentLoaded',schedule);
  update();
})();
