(() => {
  const config = window.SITE_CONFIG || {};
  const number = /^\d{10,15}$/.test(config.whatsapp || '') ? config.whatsapp : '5571992984439';
  const makeUrl = message => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const greeting = 'Oi, Filipe! Vim pelo seu site e gostaria de um orçamento. Pode me ajudar?';
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.href = makeUrl(greeting);
  });
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
      'Oi, Filipe! Preenchi o formulário do site e queria um orçamento.',
      '', `Nome: ${name}`, `Serviço: ${form.elements.service.value}`,
      `Atendimento: ${form.elements.type.value}`,
      `Local: ${form.elements.location.value.trim() || 'A combinar'}`,
      '', `Descrição: ${details}`
    ].join('\n');
    document.getElementById('form-status').textContent = 'Tudo pronto. Agora é só conferir e enviar no WhatsApp.';
    window.location.assign(makeUrl(message));
  });
})();
