(() => {
 const key='fa-preferences-consent';let consent=null;
 try{consent=localStorage.getItem(key);}catch(_){}
 window.SITE_STORAGE={getItem(k){if(consent!=='yes')return null;try{return localStorage.getItem(k);}catch(_){return null;}},setItem(k,v){if(consent==='yes')try{localStorage.setItem(k,v);}catch(_){}}};
 document.addEventListener('DOMContentLoaded',()=>{
 const banner=document.createElement('aside');banner.className='privacy-box';banner.setAttribute('aria-label','Preferências de privacidade');
 banner.innerHTML='<strong>Salvar suas preferências?</strong><p>Este site usa o armazenamento do navegador para lembrar o tema, o checklist e o recorde do jogo. Não usamos cookies de publicidade. Você pode recusar e continuar usando o site. Links externos, como WhatsApp e Cal.com, têm suas próprias políticas.</p><button type="button" data-consent="yes">Permitir</button><button type="button" data-consent="no">Recusar</button>';
 banner.hidden=consent!==null;document.body.append(banner);
 const privacy=document.createElement('button');privacy.type='button';privacy.className='privacy-settings';privacy.textContent='Preferências de privacidade';document.querySelector('footer')?.append(privacy);privacy.onclick=()=>{banner.hidden=false;banner.querySelector('button').focus();};
 banner.querySelectorAll('button').forEach(b=>b.onclick=()=>{consent=b.dataset.consent;try{localStorage.setItem(key,consent);if(consent==='no')['fa-theme','fa-check-v1','fa-snake-best'].forEach(k=>localStorage.removeItem(k));}catch(_){}banner.hidden=true;});
 const dialog=document.createElement('dialog');dialog.className='game-dialog';dialog.setAttribute('aria-label','Jogo da Cobrinha');dialog.innerHTML='<div class="game-dialog-top"><strong>Pausa pro café</strong><button type="button" aria-label="Fechar jogo">Fechar ×</button></div><iframe title="Jogo da Cobrinha" src="about:blank"></iframe>';document.body.append(dialog);
 const invite=document.createElement('aside');invite.className='game-invite';invite.setAttribute('aria-label','Convite para jogar');invite.innerHTML='<strong>Uma partida de Cobrinha?</strong><p>Se quiser fazer uma pausa, o jogo está por aqui.</p><button type="button" data-play>Quero jogar</button><button type="button" data-dismiss>Agora não</button>';document.body.append(invite);
 function open(){invite.hidden=true;dialog.showModal();dialog.querySelector('iframe').src='jogo.html';dialog.querySelector('button').focus();}
 invite.querySelector('[data-play]').onclick=open;invite.querySelector('[data-dismiss]').onclick=()=>invite.hidden=true;
 const play=document.createElement('button');play.className='game-launch';play.type='button';play.textContent='Jogar Cobrinha';document.querySelector('footer')?.append(play);play.onclick=open;
 dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.querySelector('iframe').src='about:blank';play.focus();});
 });
})();
