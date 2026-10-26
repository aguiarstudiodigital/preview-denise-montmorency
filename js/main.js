(() => {
  const c = window.SITE_CONFIG || {};
  const wa = `https://wa.me/${(c.phoneE164 || "").replace(/\D/g, "")}?text=${encodeURIComponent(c.whatsappMessage || "")}`;
  document.querySelectorAll("[data-wa]").forEach(a => a.href = wa);
  document.querySelectorAll("[data-phone]").forEach(a => a.href = `tel:${c.phoneE164}`);
  const emailSubject = "Contato pelo site | Dra. Denise Montmorency";
  const emailBody = "Olá, Dra. Denise! Gostaria de receber orientação sobre minha situação.";
  document.querySelectorAll("[data-email]").forEach(a => {
    a.href = `mailto:${c.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  });
  document.querySelectorAll("[data-instagram]").forEach(a => a.href = c.instagram);
  document.querySelectorAll("[data-linkedin]").forEach(a => a.href = c.linkedin);
  document.querySelectorAll("[data-maps]").forEach(a => a.href = c.maps || "#");
  document.querySelectorAll("[data-google]").forEach(a => a.href = c.google || "https://share.google/95h41NHeKJCvkyTO4");
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

  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

})();
