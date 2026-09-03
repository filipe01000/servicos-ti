(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('fa-theme'); } catch (_) {}
  let manual = saved === 'dark' || saved === 'light';
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.hidden = false;
      button.textContent = dark ? '☀ Tema claro' : '☾ Tema escuro';
      button.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
      button.setAttribute('aria-pressed', String(dark));
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#091321' : '#ffffff';
  }
  apply(manual ? saved : preference.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
      manual = true;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('fa-theme', next); } catch (_) {}
    });
  });
  preference.addEventListener('change', event => {
    if (!manual) apply(event.matches ? 'dark' : 'light');
  });
})();
