/* V16.13 — mailto permanece um link nativo. Nenhuma interceptacao de envio.
   Navegadores nao informam com confiabilidade se o app de e-mail abriu.
   A alternativa so aparece apos clique, se a pagina continuar ativa. */
(() => {
  const link = document.querySelector('.contact-v169 [data-email]');
  const fallback = document.getElementById('emailFallback');
  const copy = document.getElementById('emailCopyButton');
  const address = document.getElementById('emailCopyAddress');
  if (!link || !fallback || !copy || !address) return;
  let pending = null;
  let interrupted = false;
  const clearPending = () => { if (pending !== null) { clearTimeout(pending); pending = null; } };
  link.addEventListener('click', () => {
    clearPending();
    fallback.hidden = true;
    address.hidden = true;
    copy.textContent = 'Copiar endereço';
    interrupted = false;
    pending = setTimeout(() => {
      pending = null;
      if (!interrupted && document.visibilityState === 'visible' && document.hasFocus()) {
        fallback.hidden = false;
      }
    }, 1500);
    // O navegador segue o href mailto: normalmente.
  });
  window.addEventListener('blur', () => { interrupted = true; clearPending(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') { interrupted = true; clearPending(); }
  });
  copy.addEventListener('click', async () => {
    const email = 'dra.denisepestana@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;left:-9999px;top:0;';
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand('copy');
        field.remove();
        if (!ok) throw new Error('clipboard unavailable');
      }
      copy.textContent = 'Endereço copiado';
      address.hidden = true;
    } catch (_) {
      copy.textContent = 'Selecione o endereço';
      address.hidden = false;
      const range = document.createRange();
      range.selectNodeContents(address);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
})();
