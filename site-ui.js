(() => {
 const key='fa-preferences-consent';let consent=null;
 try{consent=localStorage.getItem(key);}catch(_){}
 window.SITE_STORAGE={getItem(k){if(consent!=='yes')return null;try{return localStorage.getItem(k);}catch(_){return null;}},setItem(k,v){if(consent==='yes')try{localStorage.setItem(k,v);}catch(_){}}};
 const analyticsKey='fa-analytics-consent-v1';let analytics=null,loaded=false;
 try{analytics=localStorage.getItem(analyticsKey);}catch(_){}
 window.faAnalyticsBeforeSend=(type,payload)=>{
   if(analytics!=='yes'||type!=='event'||payload.name)return false;
   if(payload.url){const u=new URL(payload.url,location.origin);payload.url=u.pathname.replace(/\/index\.html$/,'/');}
   return payload;
 };
 function loadAnalytics(){
   if(analytics!=='yes'||loaded||location.hostname!=='filipe01000.github.io')return;
   loaded=true;const script=document.createElement('script');script.defer=true;
   script.src='https://cloud.umami.is/script.js';
   script.dataset.websiteId='aad63029-7de7-486c-9284-3e1353de2a70';
   script.dataset.domains='filipe01000.github.io';
   script.dataset.excludeSearch='true';script.dataset.excludeHash='true';
   script.dataset.beforeSend='faAnalyticsBeforeSend';
   script.onerror=()=>{loaded=false;script.remove();};document.head.append(script);
 }
 document.addEventListener('DOMContentLoaded',()=>{
 const banner=document.createElement('aside');banner.className='privacy-box';banner.setAttribute('aria-label','Preferências de privacidade');
 banner.innerHTML='<strong>Suas escolhas de privacidade</strong><p>Podemos lembrar suas preferências e medir visitas com o Umami Cloud. As estatísticas incluem páginas acessadas e uma estimativa de visitantes únicos. O formulário de orçamento não é enviado ao Umami.</p><label class="check"><input type="checkbox" id="allow-preferences">Salvar tema, checklist e recorde neste navegador</label><label class="check"><input type="checkbox" id="allow-analytics">Permitir estatísticas de visitas</label><p>Você pode recusar e usar o site normalmente. Guardamos sua escolha neste navegador. Links externos têm suas próprias políticas.</p><button type="button" data-save>Salvar escolhas</button><button type="button" data-reject>Recusar opcionais</button>';
 const prefs=banner.querySelector('#allow-preferences'),stats=banner.querySelector('#allow-analytics');
 prefs.checked=consent==='yes';stats.checked=analytics==='yes';
 banner.hidden=consent!==null&&analytics!==null;document.body.append(banner);
 const privacy=document.createElement('button');privacy.type='button';privacy.className='privacy-settings';privacy.textContent='Preferências de privacidade';document.querySelector('footer')?.append(privacy);
 privacy.onclick=()=>{banner.hidden=false;prefs.checked=consent==='yes';stats.checked=analytics==='yes';prefs.focus({preventScroll:true});};
 function saveChoices(reject){
   consent=!reject&&prefs.checked?'yes':'no';analytics=!reject&&stats.checked?'yes':'no';
   try{localStorage.setItem(key,consent);localStorage.setItem(analyticsKey,analytics);if(consent==='no')['fa-theme','fa-check-v1','fa-snake-best'].forEach(k=>localStorage.removeItem(k));}catch(_){}
   banner.hidden=true;loadAnalytics();
 }
 banner.querySelector('[data-save]').onclick=()=>saveChoices(false);
 banner.querySelector('[data-reject]').onclick=()=>saveChoices(true);
 window.addEventListener('storage',event=>{if(event.key===analyticsKey){analytics=event.newValue;loadAnalytics();}});
 loadAnalytics();
 const dialog=document.createElement('dialog');dialog.className='game-dialog';dialog.setAttribute('aria-label','Jogo da Cobrinha');dialog.innerHTML='<div class="game-dialog-top"><strong>Pausa pro café</strong><button type="button" aria-label="Fechar jogo">Fechar ×</button></div><iframe title="Jogo da Cobrinha" src="about:blank"></iframe>';document.body.append(dialog);
 const invite=document.createElement('aside');invite.className='game-invite';invite.setAttribute('aria-label','Convite para jogar');invite.innerHTML='<strong>Uma partida de Cobrinha?</strong><p>Se quiser fazer uma pausa, o jogo está por aqui.</p><button type="button" data-play>Quero jogar</button><button type="button" data-dismiss>Agora não</button>';document.body.append(invite);
 function open(){invite.hidden=true;dialog.showModal();dialog.querySelector('iframe').src='jogo.html';dialog.querySelector('button').focus();}
 invite.querySelector('[data-play]').onclick=open;invite.querySelector('[data-dismiss]').onclick=()=>invite.hidden=true;
 const play=document.createElement('button');play.className='game-launch';play.type='button';play.textContent='Jogar Cobrinha';document.querySelector('footer')?.append(play);play.onclick=open;
 dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.querySelector('iframe').src='about:blank';play.focus({preventScroll:true});});
 });
})();

