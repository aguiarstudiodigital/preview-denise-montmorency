/* ASD V16.15 — horizontal storytelling acionado por scroll, sem dependencias. */
(()=>{'use strict';
 const section=document.querySelector('#abordagem .asd-journey-scroll');
 if(!section)return;
 const root=section, buttons=[...section.querySelectorAll('[data-asd-step]')],
 prev=section.querySelector('[data-asd-prev]'),next=section.querySelector('[data-asd-next]'),
 reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let progress=0,queued=false;
 function update(){queued=false;if(reduced.matches)return;
  const travel=Math.max(1,section.offsetHeight-window.innerHeight);
  progress=Math.max(0,Math.min(1,-section.getBoundingClientRect().top/travel));
  root.style.setProperty('--asd-journey-progress',progress.toFixed(5));
  const active=Math.min(2,Math.max(0,Math.round(progress*2)));
  buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===active);if(i===active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
  prev.disabled=progress<.005;next.disabled=progress>.995;
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 function go(i){i=Math.max(0,Math.min(2,i));if(reduced.matches){section.querySelectorAll('.asd-journey-panel')[i].scrollIntoView({behavior:'auto'});return}
  const travel=Math.max(1,section.offsetHeight-window.innerHeight);
  window.scrollTo({top:window.scrollY+section.getBoundingClientRect().top+travel*(i/2),behavior:'smooth'});
 }
 buttons.forEach((b,i)=>b.addEventListener('click',()=>go(i)));
 prev.addEventListener('click',()=>go(Math.max(0,Math.ceil(progress*2-.03)-1)));
 next.addEventListener('click',()=>go(Math.min(2,Math.floor(progress*2+.03)+1)));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 window.addEventListener('load',schedule);reduced.addEventListener?.('change',schedule);
 update();
})();
