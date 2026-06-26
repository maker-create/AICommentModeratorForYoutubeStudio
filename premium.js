// Traduce la página independiente premium.html según el idioma guardado.
// _storage viene de settings.js; t()/setLang() vienen de i18n.js (cargados antes).

function _aplicarIdiomaPremium() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
}

(async () => {
  const data = await _storage.get(['settings']);
  setLang(data.settings?.lang || 'en');
  _aplicarIdiomaPremium();
})();

// Si el usuario cambia el idioma desde el popup mientras esta página está
// abierta, refrescar los textos sin necesidad de recargar.
try {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.settings?.newValue?.lang) {
      setLang(changes.settings.newValue.lang);
      _aplicarIdiomaPremium();
    }
  });
} catch (_e) { /* contexto de extensión no disponible */ }
