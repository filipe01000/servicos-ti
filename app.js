(() => {
  const config = window.SITE_CONFIG || {};
  const number = /^\d{10,15}$/.test(config.whatsapp || '') ? config.whatsapp : '5571992984439';
  const makeUrl = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  document.getElementById('direct-whatsapp').href = makeUrl('Olá, Filipe! Vim pelo seu site e gostaria de conversar sobre um serviço de TI.');
  try {
    const github = new URL(config.githubUrl);
    if (github.protocol === 'https:' && github.hostname === 'github.com' && github.pathname !== '/' && !github.username && !github.password) {
      const link = document.getElementById('github-link');
      link.href = github.href;
      link.hidden = false;
      document.getElementById('github-pending').hidden = true;
    }
  } catch (_) { /* O link só aparece depois de configurar um endereço válido. */ }
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
    document.getElementById('service').value = link.dataset.service;
  }));
  document.getElementById('quote-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const details = form.elements.details.value.trim();
    if (!name || !details) {
      document.getElementById('form-status').textContent = 'Preencha seu nome e uma descrição do problema.';
      return;
    }
    const message = [
      'Olá, Filipe! Gostaria de solicitar um orçamento pelo site.',
      '', `Nome: ${name}`, `Serviço: ${form.elements.service.value}`,
      `Atendimento: ${form.elements.type.value}`,
      `Local: ${form.elements.location.value.trim() || 'A combinar'}`,
      '', `Descrição: ${details}`
    ].join('\n');
    document.getElementById('form-status').textContent = 'Pedido preparado. Confirme o envio no WhatsApp.';
    window.location.assign(makeUrl(message));
  });
})();
