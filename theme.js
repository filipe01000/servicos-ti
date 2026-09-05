(() => {
  const root = document.documentElement;
  let saved;
  try { saved = window.SITE_STORAGE.getItem('fa-theme'); } catch (_) {}
  let manual = saved === 'dark' || saved === 'light';
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.hidden = false;
      button.textContent = dark ? 'Tema claro' : 'Tema escuro';
      button.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
      button.setAttribute('aria-pressed', String(dark));
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#101e32' : '#e9f1fa';
  }
  apply(manual ? saved : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
      manual = true;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { window.SITE_STORAGE.setItem('fa-theme', next); } catch (_) {}
    });
  });
})();
