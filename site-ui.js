(() => {
 const key='fa-preferences-consent';let consent=null;
 try{consent=localStorage.getItem(key);}catch(_){}
 window.SITE_STORAGE={getItem(k){if(consent!=='yes')return null;try{return localStorage.getItem(k);}catch(_){return null;}},setItem(k,v){if(consent==='yes')try{localStorage.setItem(k,v);}catch(_){}}};
 let loaded=false;
 
 window.faAnalyticsBeforeSend=(type,payload)=>{
   if(type!=='event'||payload.name)return false;
   if(payload.url){const u=new URL(payload.url,location.origin);payload.url=u.pathname.replace(/\/index\.html$/,'/');}
   return payload;
 };
 function loadAnalytics(){
   const allowedDomains=['filipeti.com.br','www.filipeti.com.br'];
   if(loaded||!allowedDomains.includes(location.hostname))return;
   loaded=true;const script=document.createElement('script');script.defer=true;
   script.src='https://cloud.umami.is/script.js';
   script.dataset.websiteId='aad63029-7de7-486c-9284-3e1353de2a70';
   script.dataset.domains=allowedDomains.join(',');
   script.dataset.excludeSearch='true';script.dataset.excludeHash='true';
   script.dataset.beforeSend='faAnalyticsBeforeSend';
   script.onerror=()=>{loaded=false;script.remove();};document.head.append(script);
 }
 document.addEventListener('DOMContentLoaded',()=>{
 const banner=document.createElement('aside');banner.className='privacy-box';banner.setAttribute('aria-label','Preferências de privacidade');
 banner.innerHTML='<strong>Preferências do navegador</strong><label class="check"><input type="checkbox" id="allow-preferences">Lembrar tema, checklist e recorde neste navegador</label><button type="button" data-save>Salvar preferência</button><button type="button" data-reject>Não salvar preferências</button>';
 const prefs=banner.querySelector('#allow-preferences');prefs.checked=consent==='yes';
 banner.hidden=true;document.body.append(banner);
 const privacy=document.createElement('button');privacy.type='button';privacy.className='privacy-settings';privacy.textContent='Preferências';document.querySelector('footer')?.append(privacy);
 privacy.onclick=()=>{banner.hidden=false;prefs.checked=consent==='yes';prefs.focus({preventScroll:true});};
 function saveChoices(reject){consent=!reject&&prefs.checked?'yes':'no';try{localStorage.setItem(key,consent);if(consent==='no')['fa-theme','fa-check-v1','fa-snake-best'].forEach(k=>localStorage.removeItem(k));}catch(_){}banner.hidden=true;}
 banner.querySelector('[data-save]').onclick=()=>saveChoices(false);
 banner.querySelector('[data-reject]').onclick=()=>saveChoices(true);
 loadAnalytics();
 const dialog=document.createElement('dialog');dialog.className='game-dialog';dialog.setAttribute('aria-label','Jogo da Cobrinha');dialog.innerHTML='<div class="game-dialog-top"><strong>Pausa pro café</strong><button type="button" aria-label="Fechar jogo">Fechar ×</button></div><iframe title="Jogo da Cobrinha" src="about:blank"></iframe>';document.body.append(dialog);
 const invite=document.createElement('aside');invite.className='game-invite';invite.setAttribute('aria-label','Convite para jogar');invite.innerHTML='<strong>Uma partida de Cobrinha?</strong><p>Se quiser fazer uma pausa, o jogo está por aqui.</p><button type="button" data-play>Quero jogar</button><button type="button" data-dismiss>Agora não</button>';document.body.append(invite);
 function open(){invite.hidden=true;dialog.showModal();dialog.querySelector('iframe').src='jogo.html';dialog.querySelector('button').focus();}
 invite.querySelector('[data-play]').onclick=open;invite.querySelector('[data-dismiss]').onclick=()=>invite.hidden=true;
 const play=document.createElement('button');play.className='game-launch';play.type='button';play.textContent='Jogar Cobrinha';document.querySelector('footer')?.append(play);play.onclick=open;
 dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.querySelector('iframe').src='about:blank';play.focus({preventScroll:true});});
 });
})();


