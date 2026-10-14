(() => {
  const c = window.SITE_CONFIG || {};
  const wa = `https://wa.me/${(c.phoneE164||"").replace(/\D/g,"")}?text=${encodeURIComponent(c.whatsappMessage||"")}`;
  document.querySelectorAll("[data-wa]").forEach(a => a.href = wa);
  document.querySelectorAll("[data-phone]").forEach(a => a.href = `tel:${c.phoneE164}`);
  document.querySelectorAll("[data-email]").forEach(a => a.href = `mailto:${c.email}`);
  document.querySelectorAll("[data-instagram]").forEach(a => a.href = c.instagram);
  document.querySelectorAll("[data-maps]").forEach(a => a.href = c.maps);
  document.querySelectorAll("[data-dev]").forEach(a => a.href = c.developerUrl);

  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const hero = document.querySelector(".hero-video");
  const heroVideo = document.getElementById("heroVideo");
  const skipIntroButton = document.querySelector("[data-hero-skip]");

  if (hero && heroVideo) {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = matchMedia("(max-width: 900px)");
    let loadedSrc = "";
    let safetyTimer = null;
    let revealTimer = null;
    let introFinished = false;

    const clearTimers = () => {
      if (safetyTimer) clearTimeout(safetyTimer);
      if (revealTimer) clearTimeout(revealTimer);
      safetyTimer = null;
      revealTimer = null;
    };

    const revealHeroCopy = (delay = 250) => {
      if (introFinished) return;
      clearTimers();
      revealTimer = setTimeout(() => {
        if (introFinished) return;
        introFinished = true;
        hero.classList.remove("hero-state-video");
        hero.classList.add("hero-reveal-copy", "hero-video-intro-ended");
      }, delay);
    };

    const armDurationAwareSafety = () => {
      if (!Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return;
      if (safetyTimer) clearTimeout(safetyTimer);
      const remainingMs = Math.max(1000, (heroVideo.duration - heroVideo.currentTime + 1.25) * 1000);
      safetyTimer = setTimeout(() => revealHeroCopy(0), remainingMs);
    };

    const prepareIntroState = () => {
      clearTimers();
      introFinished = false;
      hero.classList.add("hero-state-video");
      hero.classList.remove("hero-reveal-copy", "hero-video-intro-ended");
    };

    const setHeroVideo = () => {
      const isMobile = mobileQuery.matches;
      const nextSrc = isMobile ? heroVideo.dataset.mobile : heroVideo.dataset.desktop;
      const nextPoster = isMobile ? heroVideo.dataset.posterMobile : heroVideo.dataset.posterDesktop;

      heroVideo.poster = nextPoster || "";

      if (reducedMotion.matches) {
        clearTimers();
        heroVideo.pause();
        heroVideo.removeAttribute("src");
        heroVideo.load();
        loadedSrc = "";
        revealHeroCopy(0);
        return;
      }

      prepareIntroState();

      if (nextSrc && nextSrc !== loadedSrc) {
        loadedSrc = nextSrc;
        heroVideo.src = nextSrc;
        heroVideo.load();
      }

      const beginPlayback = () => {
        try { heroVideo.currentTime = 0; } catch (_) {}
        const playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => revealHeroCopy(0));
        }
      };

      if (heroVideo.readyState >= 1) {
        beginPlayback();
        armDurationAwareSafety();
      } else {
        heroVideo.addEventListener("loadedmetadata", () => {
          beginPlayback();
          armDurationAwareSafety();
        }, { once:true });
      }
    };

    heroVideo.addEventListener("loadedmetadata", armDurationAwareSafety);
    heroVideo.addEventListener("ended", () => revealHeroCopy(250));
    heroVideo.addEventListener("error", () => revealHeroCopy(0));

    if (skipIntroButton) {
      skipIntroButton.addEventListener("click", () => {
        heroVideo.pause();
        revealHeroCopy(0);
      });
    }

    setHeroVideo();
    mobileQuery.addEventListener?.("change", setHeroVideo);
    reducedMotion.addEventListener?.("change", setHeroVideo);
  }

})();
