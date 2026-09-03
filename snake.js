(() => {
 const board=document.getElementById('snake-board');if(!board)return;
 const ctx=board.getContext('2d'),size=20,cell=20;
 const scoreEl=document.getElementById('snake-score'),bestEl=document.getElementById('snake-best'),status=document.getElementById('snake-status'),start=document.getElementById('snake-start'),pause=document.getElementById('snake-pause');
 let snake,food,dir,next,score=0,best=0,state='ready',timer=null,queued=false;
 try{best=Math.max(0,Number(window.SITE_STORAGE.getItem('fa-snake-best'))||0);}catch(_){}bestEl.textContent=best;
 function spawn(){const free=[];for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!snake.some(p=>p.x===x&&p.y===y))free.push({x,y});return free[Math.floor(Math.random()*free.length)];}
 function draw(){const css=getComputedStyle(document.documentElement);ctx.fillStyle=css.getPropertyValue('--bg').trim();ctx.fillRect(0,0,400,400);ctx.strokeStyle=css.getPropertyValue('--line').trim();ctx.globalAlpha=.25;ctx.beginPath();for(let i=0;i<=size;i++){ctx.moveTo(i*cell,0);ctx.lineTo(i*cell,400);ctx.moveTo(0,i*cell);ctx.lineTo(400,i*cell);}ctx.stroke();ctx.globalAlpha=1;snake.forEach((p,i)=>{ctx.fillStyle=css.getPropertyValue(i===0?'--navy':'--blue').trim();ctx.fillRect(p.x*cell+2,p.y*cell+2,16,16);});if(food){ctx.fillStyle=css.getPropertyValue('--accent').trim();ctx.beginPath();ctx.arc(food.x*cell+10,food.y*cell+10,6,0,Math.PI*2);ctx.fill();}}
 function reset(){clearInterval(timer);snake=[{x:8,y:10},{x:7,y:10},{x:6,y:10}];dir={x:1,y:0};next=dir;queued=false;score=0;scoreEl.textContent=0;food=spawn();draw();}
 function finish(won=false){clearInterval(timer);state='over';pause.disabled=true;start.textContent='Jogar novamente';status.textContent=won?'Você preencheu o tabuleiro! Pontuação: '+score+'.':'Fim de jogo! Você fez '+score+' pontos. Bora tentar de novo?';}
 function tick(){dir=next;queued=false;const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};const eating=head.x===food.x&&head.y===food.y;const body=eating?snake:snake.slice(0,-1);if(head.x<0||head.x>=size||head.y<0||head.y>=size||body.some(p=>p.x===head.x&&p.y===head.y)){finish();return;}snake.unshift(head);if(eating){score+=10;scoreEl.textContent=score;if(score>best){best=score;bestEl.textContent=best;try{window.SITE_STORAGE.setItem('fa-snake-best',String(best));}catch(_){}}food=spawn();if(!food){draw();finish(true);return;}}else snake.pop();draw();}
 function run(){state='running';pause.disabled=false;pause.textContent='Pausar';timer=setInterval(tick,140);status.textContent='Pegue os pontos e evite as bordas e o próprio corpo.';}
 function togglePause(){if(state==='running'){clearInterval(timer);state='paused';pause.textContent='Continuar';status.textContent='Jogo pausado.';}else if(state==='paused')run();}
 function turn(x,y){if(state!=='running'||queued||(x===-dir.x&&y===-dir.y))return;next={x,y};queued=true;}
 start.onclick=()=>{reset();start.textContent='Recomeçar';run();board.focus({preventScroll:true});};pause.onclick=togglePause;
 const directions={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
 document.getElementById('snake-game').addEventListener('keydown',e=>{const move=directions[e.key]||directions[e.key.toLowerCase()];if(move){e.preventDefault();turn(...move);}else if((e.key===' '&&e.target===board)||e.key.toLowerCase()==='p'){e.preventDefault();togglePause();}});
 document.querySelectorAll('[data-snake-dir]').forEach(button=>button.addEventListener('click',()=>turn(...directions[button.dataset.snakeDir])));
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='running')togglePause();});window.addEventListener('blur',()=>{if(state==='running')togglePause();});
 new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});reset();
})();
