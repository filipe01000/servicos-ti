# Atualização do site — Pingu Hacker

- Assistente flutuante no canto inferior direito, na página inicial e em Ferramentas. Abre apenas ao clicar; fecha pelo botão, Escape ou clique fora. Navegação por teclado e rótulos acessíveis.
- Ações: WhatsApp (71) 99298-4439, contato@filipeti.com.br, agenda existente no Cal.com e seção de serviços.
- Tema claro corrigido na página inicial: fundo da cena, cards, painel de atendimento, menu mobile, campos, placeholders e botões. Ajustes de largura, quebra de texto e áreas de toque.
- Removidas numerações decorativas dos títulos, cards e listas da página inicial. Números informativos e textos legais preservados.
- Mantidos identidade visual, tema escuro, conteúdo, formulário, ferramentas, preferências de privacidade e CNAME.

## Publicação no GitHub Pages

Copie o conteúdo desta pasta para a raiz já publicada do repositório, mantendo a pasta assets. Inclua index.html, recursos.html, config.js, contato.vcf, mobile-fixes.css, pingu.css, pingu.js e assets/pingu-hacker.png. Não é necessário instalar dependências, compilar ou criar servidor. Os caminhos locais são relativos e funcionam em um subdiretório do GitHub Pages. O CNAME original continua apontando para seu domínio. Esta entrega não publica automaticamente o site.

Os arquivos antigos index (1).html, index (2).html e index (3).html foram conservados como recebidos; a página publicada atual é index.html.

## Manutenção

Edite os contatos em config.js. O assistente é um menu de encaminhamento, sem IA ou armazenamento de conversas. E-mail usa o aplicativo de e-mail do visitante; WhatsApp e agenda abrem seus serviços externos.

## Arte

A conversa recuperada não disponibilizou uma imagem original do mascote. Foi criada uma nova interpretação da descrição aprovada com a ferramenta integrada Imagegen, salva em assets/pingu-hacker.png.

Prompt utilizado: “Use case: stylized-concept. Create one polished friendly Pingu Hacker mascot for an IT support website: cute black and white penguin wearing a dark navy hacker hooded coat, bright friendly eyes, small orange beak, one flipper waving. Cyan subtle trim matching navy/cyan technology branding. Full character centered, strong readable silhouette at 64 pixels, high quality soft 3D illustration. Transparent background with genuine alpha, no scene, no text, no watermark, no extra items. Square image.”

## Verificação

Verificado em Chromium/Chrome com larguras de 320, 390, 768 e 1440 pixels, temas claro e escuro. Sem erros JavaScript ou transbordamento horizontal nos elementos da página inicial; painel dentro da tela, menu responsivo e fechamento por Escape funcionando. Conferidos destinos das quatro ações e a integração na página Ferramentas. Testes em navegador automatizado, sem aparelho físico. Os serviços externos não foram acionados para enviar mensagens ou reservar horários. Fontes externas foram bloqueadas durante a verificação; as fontes alternativas locais mantiveram o layout legível.
