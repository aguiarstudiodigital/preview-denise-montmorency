
(() => {
  if (!window.gsap || !window.ScrollTrigger || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-copy > *", {
    y: 26, opacity: 0, duration: .9, stagger: .09, ease: "power3.out"
  });

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 34, opacity: 0, duration: .85, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 84%", once: true }
    });
  });

  document.querySelectorAll(".chapter").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 38, duration: .8,
      scrollTrigger: { trigger: el, start: "top 82%", once: true }
    });
  });

  gsap.to(".authority-photo img", {
    scale: 1.06,
    scrollTrigger: { trigger: ".authority", start: "top bottom", end: "bottom top", scrub: 1 }
  });
})();
