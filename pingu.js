(() => {
 const config=window.SITE_CONFIG||{};
 const asset=new URL('assets/pingu-hacker.png',document.currentScript.src).href;
 const home=new URL('index.html#servicos',document.currentScript.src).href;
 const svg=paths=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
 const icons={whatsapp:svg('<path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z"/><path d="M8 8c0 4 4 8 8 8l1-2-3-1-1 1-3-3 1-1-1-3Z"/>'),email:svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>'),calendar:svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>'),services:svg('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>')};
 const widget=document.createElement('aside');widget.className='pingu';widget.setAttribute('aria-label','Assistente Pingu Hacker');
 widget.innerHTML='<section class="pingu-panel" id="pingu-panel" aria-labelledby="pingu-title" hidden><div class="pingu-head"><img alt="" width="48" height="54"><div><h2 id="pingu-title">Pingu Hacker</h2><small>Assistente virtual do Filipe</small></div><button type="button" class="pingu-close" aria-label="Fechar assistente">'+svg('<path d="m6 6 12 12M18 6 6 18"/>')+'</button></div><p>Oi! Posso te mostrar o caminho. Como você prefere continuar?</p><nav class="pingu-actions" aria-label="Canais de atendimento"></nav></section><button type="button" class="pingu-launch" aria-expanded="false" aria-controls="pingu-panel" aria-label="Abrir assistente Pingu Hacker"><img alt="" width="54" height="60"><span>Posso ajudar?</span></button>';
 widget.querySelectorAll('img').forEach(img=>img.src=asset);
 const actions=[['whatsapp','Falar no WhatsApp','https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent('Olá, Filipe! Vim pelo site com a ajuda do Pingu. Pode me ajudar?')],['email','Enviar e-mail','mailto:'+config.email],['calendar','Agendar conversa',config.bookingUrl],['services','Conhecer os serviços',document.getElementById('servicos')?'#servicos':home]];
 for(const [icon,label,url] of actions){const a=document.createElement('a');a.href=url;a.innerHTML=icons[icon];a.append(document.createTextNode(label));if(icon==='whatsapp'||icon==='calendar'){a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',label+' (abre em nova aba)');}if(icon==='services')a.addEventListener('click',()=>{close(false);const title=document.querySelector('#servicos h2');if(title){title.tabIndex=-1;title.focus({preventScroll:true});}});widget.querySelector('nav').append(a);}
 const panel=widget.querySelector('.pingu-panel'),launcher=widget.querySelector('.pingu-launch');
 function close(restore=true){panel.hidden=true;launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-label','Abrir assistente Pingu Hacker');if(restore)launcher.focus({preventScroll:true});}
 launcher.addEventListener('click',()=>{if(!panel.hidden){close();return;}panel.hidden=false;launcher.setAttribute('aria-expanded','true');launcher.setAttribute('aria-label','Fechar assistente Pingu Hacker');panel.querySelector('.pingu-close').focus({preventScroll:true});});
 widget.querySelector('.pingu-close').addEventListener('click',()=>close());
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){close();}});
 document.addEventListener('pointerdown',event=>{if(!panel.hidden&&!widget.contains(event.target))close(false);});
 document.body.append(widget);
})();
