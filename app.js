/* Kurcze Pieczone × DoNastępnego — logika prezentacji */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const P = 'assets/products/';

/* ---------- ikony ---------- */
const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/></svg>',
  qr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 18h3v3h-3z"/></svg>',
  promo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
  bell:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/></svg>'
};
const nav = on => `<nav class="app-nav">
  <span class="${on==='home'?'on':''}">${I.home}Start</span>
  <span class="${on==='rewards'?'on':''}">${I.gift}Nagrody</span>
  <span><b class="qrb">${I.qr}</b></span>
  <span class="${on==='promo'?'on':''}">${I.promo}Promocje</span>
  <span class="${on==='user'?'on':''}">${I.user}Konto</span></nav>`;
const sb = '<div class="sb"><span>12:05</span><span class="ic">'
  + '<svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>'
  + '<svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.6 0 5 1 6.8 2.7l1.2-1.3C13.9 1.6 11.1.4 8 .4S2.1 1.6 0 3.6l1.2 1.3C3 3.2 5.4 2.2 8 2.2z"/><path d="M8 5.6c1.7 0 3.2.6 4.4 1.7l1.2-1.3C12.1 4.6 10.1 3.8 8 3.8S3.9 4.6 2.4 6l1.2 1.3C4.8 6.2 6.3 5.6 8 5.6z"/><path d="M8 9c.8 0 1.5.3 2 .8L8 12 6 9.8c.5-.5 1.2-.8 2-.8z"/></svg>'
  + '<svg class="bat" viewBox="0 0 27 13"><rect x=".7" y=".7" width="22.6" height="11.6" rx="3.4" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.2"/><rect x="2.4" y="2.4" width="19.2" height="8.2" rx="2" fill="currentColor"/><path d="M24.8 4.3v4.4c.9-.3 1.5-1.2 1.5-2.2s-.6-1.9-1.5-2.2z" fill="currentColor" fill-opacity=".45"/></svg>'
  + '</span></div>';

/* stan promocji (edytowany w kreatorze na slajdzie 11) */
const promo = { name:'Koko Burger', tag:'−5 zł', img:'koko-burger', sub:'14,99 zł zamiast 19,99 zł · do niedzieli' };

/* ---------- ekrany aplikacji ---------- */
const screens = {
  home: (o = {}) => {
    const bal = o.bal ?? 3200, goal = 4500, miss = Math.max(0, goal - bal);
    return `<div class="app">
    <div class="app-top">${sb}
      <div class="app-bar"><img src="assets/logo.png" alt=""><div class="app-bell">${I.bell}</div></div>
      <div class="app-hi">Cześć, Ania! Dobrze Cię widzieć.</div>
      <div class="balance"><div><div class="bal-label">Twoje ziarenka</div>
        <div class="bal-num"><span class="js-bal">${fmt(bal)}</span><i class="grain"></i></div>
        <div class="bal-level js-lvl">${bal>=5000?'Poziom: Kurczak · '+fmt(15000-bal)+' do Koguta':'Poziom: Pisklę · '+fmt(5000-bal)+' do Kurczaka'}</div></div>
        <div class="mini-mascot"></div></div>
    </div>
    <div class="app-body">
      <div class="app-h">Twój cel <span>zmień</span></div>
      <div class="goal"><img src="${P}kurczak-z-rozna.webp" alt=""><div style="flex:1"><div class="t">Kurczak z rożna</div>
        <div class="s js-miss">${miss? 'Brakuje Ci <b style="color:var(--red)">'+fmt(miss)+'</b> ziarenek' : '<b style="color:var(--ok)">Możesz odebrać!</b>'}</div>
        <div class="pbar"><i class="js-pb" style="width:${Math.min(100,bal/goal*100)}%"></i></div></div></div>
      <div class="app-h">Kupony <span>zobacz wszystkie</span></div>
      <div class="promo js-promo"><img src="${P}${promo.img}.webp" alt=""><div><b class="js-pn">${promo.name}</b><small class="js-ps">${promo.sub}</small></div><span class="tag js-pt">${promo.tag}</span></div>
    </div>${nav('home')}</div>`;
  },
  rewards: () => `<div class="app">${sb}
    <div style="padding:6px 18px 10px"><div style="font-family:var(--disp);font-size:44px;line-height:.9;color:var(--red)">Nagrody</div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px">Masz <b style="color:var(--ink)">3 200</b> ziarenek</div></div>
    <div class="app-body" style="padding-top:0">
      <div class="chips"><span class="on">Wszystkie</span><span>Z menu</span><span>Gadżety</span><span>Rabaty</span></div>
      <div class="rlist">
        ${[['kulczoki','Kulczoki',1500],['koko-burger','Koko Burger',3000],['kurczak-z-rozna','Kurczak z rożna',4500],['mega-kubelek','Mega Kubełek',7500]].map(([im,t,p])=>{
          const m=p-3200;return `<div class="ritem"><img src="${P}${im}.webp" alt=""><div style="flex:1"><div class="t">${t}</div><div class="p">${fmt(p)} ziarenek</div>
          <div class="m ${m<=0?'ok':''}">${m<=0?'✓ Możesz odebrać':'Brakuje '+fmt(m)}</div><div class="pbar"><i style="width:${Math.min(100,3200/p*100)}%"></i></div></div></div>`}).join('')}
      </div></div>${nav('rewards')}</div>`,
  qr: () => `<div class="app">${sb}
    <div class="qrwrap"><div class="t">Moja karta</div><canvas width="29" height="29" class="js-qr"></canvas>
    <div class="timer">Kod ważny jeszcze 0:58</div><div class="s">Pokaż kod przy kasie po zakupie. Ziarenka dopiszą się automatycznie z paragonu.</div></div>${nav('')}</div>`
};

function renderApps(){
  $$('[data-app]').forEach(el => { el.innerHTML = screens[el.dataset.app](); });
  $$('.js-qr').forEach(drawQR);
  requestAnimationFrame(()=>$$('.pbar i').forEach(i=>{const w=i.style.width;i.style.width='0';requestAnimationFrame(()=>i.style.width=w)}));
}

/* atrapa kodu QR */
function drawQR(c){
  const x = c.getContext('2d'), n = 29; let s = 7;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  x.fillStyle = '#fff'; x.fillRect(0,0,n,n); x.fillStyle = '#1a1717';
  for (let i=0;i<n;i++) for (let j=0;j<n;j++) if (rnd()>.52) x.fillRect(i,j,1,1);
  const finder=(a,b)=>{x.fillStyle='#fff';x.fillRect(a-1,b-1,9,9);x.fillStyle='#1a1717';x.fillRect(a,b,7,7);x.fillStyle='#fff';x.fillRect(a+1,b+1,5,5);x.fillStyle='#bd0926';x.fillRect(a+2,b+2,3,3)};
  finder(0,0);finder(n-7,0);finder(0,n-7);
  x.fillStyle='#fff';x.fillRect(11,11,7,7);x.fillStyle='#bd0926';x.fillRect(12,12,5,5);
  c.style.imageRendering='pixelated';
}

/* ---------- skalowanie sceny ---------- */
const stage = $('#stage');
function fit(){
  const k = Math.min(innerWidth/1600, innerHeight/900);
  stage.style.transform = `scale(${k}) translate(-50%,-50%)`;
  stage.style.transformOrigin = '0 0';
  stage.style.left = '50%'; stage.style.top = '50%';
  stage.style.transform = `translate(-50%,-50%) scale(${k})`;
  stage.style.transformOrigin = 'center center';
}
addEventListener('resize', fit); fit();

/* ---------- nawigacja ---------- */
const slides = $$('.slide');
const N = slides.length;
let cur = 0, busy = false;
const dots = $('#dots');
slides.forEach((_,i)=>{const b=document.createElement('button');b.onclick=()=>go(i);dots.appendChild(b)});

function setActive(i){
  slides.forEach((s,k)=>s.classList.toggle('active',k===i));
  // restart animacji wejścia
  const s = slides[i]; s.classList.remove('active'); void s.offsetWidth; s.classList.add('active');
  cur = i;
  $('#count').textContent = String(i+1).padStart(2,'0')+' / '+N;
  $('#bar').style.width = ((i+1)/N*100)+'%';
  $$('#dots button').forEach((b,k)=>b.classList.toggle('on',k===i));
  history.replaceState(null,'','#'+(i+1));
  onEnter(s);
}

const wipe = $('#wipe');
async function go(i){
  if (busy || i===cur || i<0 || i>=N) return;
  busy = true;
  const dir = i>cur ? 1 : -1;
  const color = slides[i].dataset.wipe || 'red';
  wipe.className = color==='yel'?'yel':'';
  const from = dir>0 ? '100% 100%' : '0% 0%', to = dir>0 ? '0% 0%' : '100% 100%';
  const img = wipe.querySelector('img');
  img.animate([{transform:'scale(.6) rotate(-10deg)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
  await wipe.animate([{clipPath:`circle(0% at ${from})`},{clipPath:`circle(150% at ${from})`}],{duration:520,easing:'cubic-bezier(.7,0,.3,1)',fill:'forwards'}).finished;
  setActive(i);
  await new Promise(r=>setTimeout(r,90));
  img.animate([{opacity:1},{opacity:0,transform:'scale(1.3)'}],{duration:300,fill:'forwards'});
  await wipe.animate([{clipPath:`circle(150% at ${to})`},{clipPath:`circle(0% at ${to})`}],{duration:560,easing:'cubic-bezier(.7,0,.3,1)',fill:'forwards'}).finished;
  busy = false;
}
const next = () => go(cur+1), prev = () => go(cur-1);
$('#next').onclick = next; $('#prev').onclick = prev;
addEventListener('keydown', e => {
  if (e.target.tagName==='INPUT') { if (!['PageDown','PageUp'].includes(e.key)) return; }
  if (['ArrowRight','PageDown',' ','Enter'].includes(e.key)) { e.preventDefault(); next(); }
  else if (['ArrowLeft','PageUp','Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
  else if (e.key==='Home') go(0); else if (e.key==='End') go(N-1);
  else if (e.key==='f'||e.key==='F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
});
let tx=null;
addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
addEventListener('touchend',e=>{if(tx===null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>60)(d<0?next:prev)();tx=null});

/* ---------- akcje przy wejściu na slajd ---------- */
function onEnter(s){
  $$('[data-count]', s).forEach(el => countUp(el, +el.dataset.count, el.hasAttribute('data-plain')));
  if (s.classList.contains('s-dash')) drawDash($('#dFlt .on').dataset.f);
  runScene(s);
}
function countUp(el, to, plain){
  const from = plain ? to-30 : 0, t0 = performance.now(), dur = 1400;
  const step = t => { const p = Math.min(1,(t-t0-400)/dur); if(p<0){requestAnimationFrame(step);return}
    const v = from + (to-from)*(1-Math.pow(1-p,3)); el.textContent = plain? Math.round(v) : fmt(v); if(p<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- okładka: spadające ziarenka ---------- */
(() => { const g = $('#grains'); for (let i=0;i<34;i++){ const e=document.createElement('i');
  e.style.left=(Math.random()*100)+'%'; e.style.animationDuration=(6+Math.random()*8)+'s';
  e.style.animationDelay=(-Math.random()*14)+'s'; const sc=.5+Math.random()*.9; e.style.width=14*sc+'px'; e.style.height=20*sc+'px'; g.appendChild(e);} })();

/* ---------- sklep nagród ---------- */
const MUG = `<svg viewBox="0 0 140 130"><ellipse cx="62" cy="118" rx="52" ry="7" fill="rgba(0,0,0,.12)"/><path d="M14 22h96v74a20 20 0 0 1-20 20H34a20 20 0 0 1-20-20z" fill="#bd0926"/><path d="M110 40h8a16 16 0 0 1 0 32h-8" fill="none" stroke="#bd0926" stroke-width="10"/><ellipse cx="62" cy="22" rx="48" ry="8" fill="#8e0a1f"/><image href="assets/logo.png" x="30" y="44" width="64" height="44"/></svg>`;
const TEE = `<svg viewBox="0 0 160 140"><path d="M50 10l-40 22 14 26 14-7v80h84V51l14 7 14-26-40-22c-4 10-14 16-30 16S54 20 50 10z" fill="#1a1717"/><path d="M50 10c4 10 14 16 30 16s26-6 30-16" fill="none" stroke="#bd0926" stroke-width="5"/><image href="assets/logo.png" x="52" y="50" width="56" height="38"/></svg>`;
const BAG = `<svg viewBox="0 0 140 140"><path d="M44 44V34a26 26 0 0 1 52 0v10" fill="none" stroke="#e0a800" stroke-width="7"/><path d="M22 44h96l-6 86H28z" fill="#ffc401"/><circle cx="70" cy="88" r="28" fill="#bd0926"/><image href="assets/logo.png" x="49" y="74" width="42" height="28"/></svg>`;
const CPN = `<svg viewBox="0 0 170 120"><path d="M10 20h150v28a12 12 0 0 0 0 24v28H10V72a12 12 0 0 0 0-24z" fill="#bd0926"/><path d="M60 22v76" stroke="#fff" stroke-dasharray="5 6" stroke-width="2"/><text x="112" y="72" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="34" fill="#ffc401">-20%</text><text x="35" y="66" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="12" fill="#fff" transform="rotate(-90 35 62)">RABAT</text></svg>`;
function burst(host){
  const r=host.getBoundingClientRect();
  for(let i=0;i<26;i++){const g=document.createElement('i');g.style.cssText='position:absolute;width:10px;height:14px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0 0 12%,#ffc401 34%,#e39a00);z-index:30;left:50%;top:40%';
    host.appendChild(g);const a=Math.random()*Math.PI*2,d=80+Math.random()*120;
    g.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+60}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:1100+Math.random()*500,easing:'cubic-bezier(.2,.8,.2,1)'}).finished.then(()=>g.remove());}
}
/* ---------- panel centrali ---------- */
const dashData={
  all:{k:['18 420','2,7','3 912','+31%'],seed:3,base:600,
    bars:[['Oława',96],['Zabrze',88],['Sosnowiec',81],['Dzierżoniów',74],['Ostrowiec Św.',69],['Opole',61]]},
  slask:{k:['6 280','2,9','1 404','+27%'],seed:11,base:220,
    bars:[['Zabrze',94],['Sosnowiec',87],['Gliwice',72],['Katowice',66],['Bytom',58],['Tychy',51]]},
  olawa:{k:['712','3,4','188','+38%'],seed:5,base:28,
    bars:[['Pn',58],['Wt',62],['Śr',100],['Cz',64],['Pt',83],['So',71]]}
};
function drawDash(f){
  const d=dashData[f]; $$('.kpi .v').forEach((v,i)=>{v.textContent=d.k[i];v.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:500})});
  let s=d.seed;const r=()=>(s=(s*9301+49297)%233280)/233280;
  const pts=[...Array(30)].map((_,i)=>{const y=60+i*3.2+Math.sin(i/2.2)*18+(i%7===2?42:0)+r()*16;return[i*(600/29),200-y*0.85]});
  const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const svg=$('#lineChart');
  svg.innerHTML=`<defs><linearGradient id="lg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bd0926" stop-opacity=".28"/><stop offset="1" stop-color="#bd0926" stop-opacity="0"/></linearGradient></defs>
  ${[50,100,150].map(y=>`<line x1="0" x2="600" y1="${y}" y2="${y}" stroke="#eadcc6" stroke-width="1"/>`).join('')}
  <path d="${path} L600,200 L0,200Z" fill="url(#lg)"/><path id="lp" d="${path}" fill="none" stroke="#bd0926" stroke-width="3.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  ${pts.filter((_,i)=>i%7===2).map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#ffc401" stroke="#bd0926" stroke-width="2.5" vector-effect="non-scaling-stroke"/>`).join('')}`;
  const lp=$('#lp'),L=lp.getTotalLength();lp.style.strokeDasharray=L;lp.animate([{strokeDashoffset:L},{strokeDashoffset:0}],{duration:1600,easing:'cubic-bezier(.4,0,.2,1)',delay:300,fill:'backwards'});
  $('#bars').innerHTML=d.bars.map(([n,v])=>`<div class="brow"><span>${n}</span><div class="tr"><i data-w="${v}%"></i></div><span>${v}</span></div>`).join('');
  setTimeout(()=>$$('#bars i').forEach(i=>i.style.width=i.dataset.w),200);
}
$$('#dFlt button').forEach(b=>b.onclick=()=>{$$('#dFlt button').forEach(x=>x.classList.remove('on'));b.classList.add('on');drawDash(b.dataset.f)});


/* ---------- animacja przepływu na slajdzie POS ---------- */
(function flowLoop(t){
  const d=$('#flowDot'); if(d && slides[cur].classList.contains('s-flow')){const p=(t/3200)%1;d.setAttribute('cx',(p*1220).toFixed(1))}
  requestAnimationFrame(flowLoop);
})(0);

/* ---------- ekrany aplikacji: animowane sceny (jeden ekran na slajd) ---------- */
let timers = [];
const T = (f, ms) => timers.push(setTimeout(f, ms));
const stopScenes = () => { timers.forEach(clearTimeout); timers = []; };
const numTo = (el, from, to, dur = 900) => {
  const t0 = performance.now();
  const st = t => { const p = Math.min(1, (t - t0) / dur), v = from + (to - from) * (1 - Math.pow(1 - p, 3));
    el.textContent = fmt(v); if (p < 1 && el.isConnected) requestAnimationFrame(st); };
  requestAnimationFrame(st);
};
const tapEl = (scr, el, dx) => { let t = $('.tap', scr); if (!t) { t = document.createElement('div'); t.className = 'tap'; scr.appendChild(t); }
  const r = el.getBoundingClientRect(), s = scr.getBoundingClientRect(), f = scr.offsetWidth / s.width;
  t.style.left = ((dx != null ? r.left + dx / f : r.left + r.width / 2) - s.left) * f + 'px'; t.style.top = (r.top + r.height / 2 - s.top) * f + 'px';
  t.classList.remove('go'); void t.offsetWidth; t.classList.add('go'); };
const toastHTML = (h, x) => `<div class="toast"><div class="av"></div><div><div class="h">${h}</div><div class="x">${x}</div></div></div>`;
const PIN = c => `<svg viewBox="0 0 30 40"><path d="M15 39C15 39 2 24 2 14a13 13 0 0 1 26 0c0 10-13 25-13 25z" fill="${c}" stroke="#fff" stroke-width="2"/><circle cx="15" cy="14" r="5" fill="#fff"/></svg>`;
const TRUCK = '<svg viewBox="0 0 38 26"><rect x="1" y="4" width="22" height="15" rx="2" fill="#bd0926"/><path d="M23 9h8l5 6v4H23z" fill="#8e0a1f"/><path d="M26 11h4l3 4h-7z" fill="#cfe3ff"/><circle cx="8" cy="21" r="3.5" fill="#1a1717"/><circle cx="29" cy="21" r="3.5" fill="#1a1717"/><circle cx="8" cy="21" r="1.4" fill="#fff"/><circle cx="29" cy="21" r="1.4" fill="#fff"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>';

const CAT = '<svg viewBox="0 0 40 40"><path d="M8 14 L10 4 L17 10 Z" fill="#f29b38"/><path d="M32 14 L30 4 L23 10 Z" fill="#f29b38"/><path d="M10 6.5 L11.5 11 L14.5 9.5 Z" fill="#ffc9a8"/><path d="M30 6.5 L28.5 11 L25.5 9.5 Z" fill="#ffc9a8"/><ellipse cx="20" cy="23" rx="14" ry="12.5" fill="#f6a944"/><path d="M14 13c2 2 3 2 6 2s4 0 6-2" stroke="#d9822b" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="28" rx="7.5" ry="5.5" fill="#fff3e3"/><circle cx="14.5" cy="22" r="2.6" fill="#1a1717"/><circle cx="25.5" cy="22" r="2.6" fill="#1a1717"/><circle cx="15.3" cy="21.1" r=".9" fill="#fff"/><circle cx="26.3" cy="21.1" r=".9" fill="#fff"/><path d="M18.6 25.6h2.8l-1.4 1.6z" fill="#e5677a"/><path d="M20 27.2c-.6 1.6-2.6 1.8-3.4.8M20 27.2c.6 1.6 2.6 1.8 3.4.8" stroke="#1a1717" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M6 25h6M6.5 28.5l5.5-1.5M34 25h-6M33.5 28.5L28 27" stroke="#c9752a" stroke-width=".9" stroke-linecap="round"/><circle cx="11" cy="27" r="1.8" fill="#ff9c9c" opacity=".6"/><circle cx="29" cy="27" r="1.8" fill="#ff9c9c" opacity=".6"/></svg>';

/* ładny kod: zaokrąglone moduły, ciemne narożniki, Pan Czak w środku */
function drawQR2(c){
  const n = 29, m = 8, x = c.getContext('2d'); c.width = c.height = n * m;
  let s = 11; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const rr = (px, py, w, h, r) => { x.beginPath(); x.roundRect(px, py, w, h, r); x.fill(); };
  const inFinder = (i, j) => (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
  const inCenter = (i, j) => i > 9 && i < 19 && j > 9 && j < 19;
  x.clearRect(0, 0, c.width, c.height); x.fillStyle = '#1a1717';
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (!inFinder(i, j) && !inCenter(i, j) && rnd() > .5) rr(i * m + .8, j * m + .8, m - 1.6, m - 1.6, 2.6);
  const finder = (a, b) => { x.fillStyle = '#1a1717'; rr(a * m, b * m, 7 * m, 7 * m, 14); x.fillStyle = '#fff'; rr(a * m + m, b * m + m, 5 * m, 5 * m, 9);
    x.fillStyle = '#bd0926'; rr(a * m + 2 * m, b * m + 2 * m, 3 * m, 3 * m, 7); };
  finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
}

/* strumień ziarenek z salda do etykiety na slajdzie */
function grainStream(slide, fromEl, toEl, count = 70){
  const st = stage.getBoundingClientRect(), k = st.width / 1600;
  const a = fromEl.getBoundingClientRect(), b = toEl.getBoundingClientRect();
  const x0 = (a.left + a.width * .5 - st.left) / k, y0 = (a.top + a.height * .5 - st.top) / k;
  const x1 = (b.left + b.width * .5 - st.left) / k, y1 = (b.top + b.height * .5 - st.top) / k;
  for (let i = 0; i < count; i++) T(() => {
    const g = document.createElement('i'); g.className = 'fly'; slide.appendChild(g);
    const dx = (Math.random() - .5) * 90, dy = (Math.random() - .5) * 50, lift = -60 - Math.random() * 160, sc = 1 + Math.random() * .9;
    g.animate([
      { transform: `translate(${x0 + dx}px,${y0 + dy}px) scale(${sc}) rotate(0deg)`, opacity: 0 },
      { opacity: 1, offset: .12 },
      { transform: `translate(${(x0 + x1) / 2 + dx}px,${Math.min(y0, y1) + lift}px) scale(${sc * 1.15}) rotate(${200 + Math.random() * 200}deg)`, offset: .5 },
      { transform: `translate(${x1 + dx * .3}px,${y1 + dy * .3}px) scale(${sc * .6}) rotate(${500 + Math.random() * 300}deg)`, opacity: .2 }
    ], { duration: 1000 + Math.random() * 300, easing: 'cubic-bezier(.4,0,.3,1)' }).finished.then(() => g.remove());
  }, i * 20);
}

const COUPONS = [
  ['koko-burger', 'Koko Burger', '<b>14,99 zł</b><s>19,99 zł</s>', 'do niedzieli'],
  ['kulczoki', 'Kulczoki duże', '<b>9,99 zł</b><s>13,99 zł</s>', 'do niedzieli'],
  ['mega-kubelek', 'Mega Kubełek', '<b>900 ziarenek</b><s>300</s>', 'do niedzieli'],
  ['strips-burger', 'Strips Burger', '<b>2 za 1</b><i>w poniedziałek</i>', 'do poniedziałku'],
  ['pikantne-skrzydelka', 'Pikantne skrzydełka', '<b>6 szt. w cenie 4</b>', 'do piątku'],
  ['tortilla-z-gyrosem', 'Tortilla z gyrosem', '<b>11,99 zł</b><s>15,99 zł</s>', 'do soboty'],
  ['zapiekanka-z-gyrosem', 'Zapiekanka z gyrosem', '<b>+250 ziarenek</b>', 'do niedzieli']];

const scenes = {
  /* 1. Start: wpada paragon, saldo rośnie, kupony się przewijają */
  home(scr) {
    scr.innerHTML = screens.home({ bal: 3200 }) + toastHTML('KURCZE PIECZONE · TERAZ', 'Paragon z Oławy, kasa 2: <b>+225 ziarenek</b>');
    const promos = [
      ['koko-burger', 'Koko Burger', '14,99 zł zamiast 19,99 zł', '−5 zł'],
      ['mega-kubelek', 'Mega Kubełek', '900 ziarenek zamiast 300', '×3'],
      ['kulczoki', 'Kulczoki duże', '9,99 zł zamiast 13,99 zł', '−4 zł']];
    $('.js-promo', scr).outerHTML = `<div class="car"><div class="trk">${promos.map(([im, n, s, t]) =>
      `<div class="promo"><img src="${P}${im}.webp" alt=""><div><b>${n}</b><small>${s}</small></div><span class="tag">${t}</span></div>`).join('')}</div>
      <div class="dots">${promos.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div></div>`;
    const bal = $('.js-bal', scr), pb = $('.js-pb', scr), miss = $('.js-miss', scr), lvl = $('.js-lvl', scr), toast = $('.toast', scr), trk = $('.trk', scr);
    let slide = 0;
    const carousel = () => { slide = (slide + 1) % promos.length; trk.style.transform = `translateX(${-100 * slide}%)`;
      $$('.dots i', scr).forEach((d, i) => d.classList.toggle('on', i === slide)); T(carousel, 2600); };
    T(carousel, 2600);
    const set = v => { bal.textContent = fmt(v); pb.style.width = Math.min(100, v / 4500 * 100) + '%';
      miss.innerHTML = 'Brakuje Ci <b style="color:var(--red)">' + fmt(4500 - v) + '</b> ziarenek'; lvl.textContent = 'Poziom: Pisklę · ' + fmt(5000 - v) + ' do Kurczaka'; };
    const run = () => {
      set(3200);
      T(() => toast.classList.add('on'), 900);
      T(() => { numTo(bal, 3200, 3425); bal.parentElement.classList.remove('bump'); void bal.offsetWidth; bal.parentElement.classList.add('bump');
        pb.style.width = 3425 / 4500 * 100 + '%'; miss.innerHTML = 'Brakuje Ci <b style="color:var(--red)">1 075</b> ziarenek'; lvl.textContent = 'Poziom: Pisklę · 1 575 do Kurczaka'; burst(scr); }, 1600);
      T(() => toast.classList.remove('on'), 4300);
      T(run, 7800);
    };
    run();
  },

  /* 2. Moja karta: skan kodu, potwierdzenie, ziarenka (bez licznika czasu) */
  card(scr) {
    scr.innerHTML = `<div class="app">${sb}
      <div class="scr-h"><div class="t">Moja karta</div></div>
      <div class="card2">
        <div class="who"><div class="cat">${CAT}</div><div><b>Ania K.</b>Poziom: Pisklę</div><div class="pts"><span class="js-p">3 200</span> <i class="grain" style="width:11px;height:15px"></i></div></div>
        <div class="qrbox"><canvas class="js-qr2"></canvas><div class="qm"></div><div class="laser"></div></div>
        <div class="phn"><i>lub podaj przy kasie</i><b>+48 600 ••• 214</b></div>
        <div class="hint">Pokaż kod przy kasie przed płatnością. Ziarenka i aktywne kupony naliczą się same.</div>
      </div>${nav('')}
      <div class="okv"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke-opacity=".35"/><path d="M7 12.5l3.2 3.2L17 9"/></svg>
        <div class="a1">Zeskanowano!</div><div class="a2">Oława · kasa 2 · paragon 45,00 zł</div>
        <div class="a3">+<span class="js-plus">0</span> <i class="grain"></i></div><div class="a4">Środa ×2 · nowe saldo: <b>3 650</b></div></div></div>`;
    drawQR2($('.js-qr2', scr));
    const qb = $('.qrbox', scr), ok = $('.okv', scr), p = $('.js-p', scr), plus = $('.js-plus', scr);
    const run = () => {
      ok.classList.remove('on'); p.textContent = '3 200'; plus.textContent = '0';
      T(() => qb.classList.add('scan'), 900);
      T(() => { qb.classList.remove('scan'); ok.classList.add('on'); }, 3300);
      T(() => { numTo(plus, 0, 450, 800); burst(scr); }, 3800);
      T(() => { ok.classList.remove('on'); numTo(p, 3200, 3650); }, 6400);
      T(run, 9200);
    };
    run();
  },

  /* 3. Kupony tygodnia: przewijanie listy, szczegóły, aktywacja na konto */
  coupons(scr) {
    scr.innerHTML = `<div class="app">${sb}
      <div class="scr-h"><div class="t">Kupony tygodnia</div><div class="s">Aktywuj, a rabat naliczy się przy kasie</div></div>
      <div class="cnt"><span>Nowe kupony za</span><b class="js-c">2 d 14:22:05</b></div>
      <div class="cwrap"><div class="cps">${COUPONS.map(([im, t, pr, ex], i) => `<div class="cp" data-i="${i}"><img src="${P}${im}.webp" alt=""><div class="bd"><div class="t">${t}</div><div class="pr">${pr}</div><div class="ex">Ważny ${ex}</div></div></div>`).join('')}</div></div>
      ${nav('promo')}
      <div class="cdet"><div class="hero"><img src="${P}koko-burger.webp" alt=""><div class="bk">‹</div><div class="badge">−5 zł</div></div>
        <div class="bd"><div class="k">Kupon tygodnia · ważny do niedzieli</div><div class="t">Koko Burger</div>
          <div class="pr"><b>14,99 zł</b><s>19,99 zł</s><em>Oszczędzasz 5 zł</em></div>
          <div class="cond"><b>Warunki</b>Jeden kupon na paragon. We wszystkich lokalach sieci. Rabat nalicza się po zeskanowaniu Twojej karty.</div>
          <div class="act">Aktywuj kupon</div></div></div>
      ${toastHTML('KURCZE PIECZONE · TERAZ', 'Kupon jest na Twoim koncie. <b>Pokaż kartę przy kasie.</b>')}</div>`;
    const c = $('.js-c', scr), list = $('.cps', scr), det = $('.cdet', scr), act = $('.act', scr), toast = $('.toast', scr), first = $('.cp', scr);
    let left = 2 * 86400 + 14 * 3600 + 22 * 60 + 5;
    const tick = () => { left--; const d = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
      c.textContent = `${d} d ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`; T(tick, 1000); };
    T(tick, 1000);
    const run = () => {
      list.style.transform = ''; det.classList.remove('on'); act.classList.remove('on'); act.textContent = 'Aktywuj kupon'; toast.classList.remove('on');
      first.classList.remove('on'); $('.ex', first).textContent = 'Ważny do niedzieli';
      T(() => { list.style.transform = 'translateY(-330px)'; }, 900);
      T(() => { list.style.transform = ''; }, 2900);
      T(() => tapEl(scr, first), 4700);
      T(() => det.classList.add('on'), 4950);
      T(() => tapEl(scr, act), 6500);
      T(() => { act.classList.add('on'); act.textContent = '✓ Aktywny · na Twoim koncie'; burst(scr); }, 6750);
      T(() => toast.classList.add('on'), 7200);
      T(() => { det.classList.remove('on'); toast.classList.remove('on'); first.classList.add('on'); $('.ex', first).textContent = '✓ Aktywny na koncie'; }, 9600);
      T(run, 12000);
    };
    run();
  },

  /* 4. Katalog nagród: filtry przełączają się same, lista wjeżdża */
  catalog(scr) {
    const items = [
      ['m', 'Kulczoki', 1500, `<img src="${P}kulczoki.webp" alt="">`],
      ['r', 'Rabat -20% na zamówienie', 2000, `<div class="gx">${CPN}</div>`],
      ['m', 'Koko Burger', 3000, `<img src="${P}koko-burger.webp" alt="">`],
      ['g', 'Kubek Kurcze Pieczone', 3750, `<div class="gx">${MUG}</div>`],
      ['m', 'Kurczak z rożna', 4500, `<img src="${P}kurczak-z-rozna.webp" alt="">`],
      ['g', 'Torba na zakupy', 5500, `<div class="gx">${BAG}</div>`],
      ['r', 'Rabat -10 zł na zestaw', 2500, `<div class="gx">${CPN.replace('-20%', '-10 zł')}</div>`],
      ['g', 'Koszulka „Złoty Kur”', 8000, `<div class="gx">${TEE}</div>`],
      ['m', 'Mega Kubełek', 7500, `<img src="${P}mega-kubelek.webp" alt="">`]];
    const tabs = [['*', 'Wszystkie'], ['m', 'Z menu'], ['g', 'Gadżety'], ['r', 'Rabaty']];
    scr.innerHTML = `<div class="app">${sb}
      <div class="scr-h"><div class="t">Odbierz za ziarenka</div><div class="s">Masz <b>3 200</b> ziarenek</div></div>
      <div class="app-body" style="padding-top:0">
        <div class="chips">${tabs.map(([k, n], i) => `<span data-k="${k}" class="${i ? '' : 'on'}">${n}</span>`).join('')}</div>
        <div class="rlist"></div></div>${nav('rewards')}</div>`;
    const list = $('.rlist', scr);
    const show = k => {
      $$('.chips span', scr).forEach(s => s.classList.toggle('on', s.dataset.k === k));
      list.innerHTML = items.filter(i => k === '*' || i[0] === k).slice(0, 4).map(([, t, p, im], n) => { const m = p - 3200;
        return `<div class="ritem rin ${m <= 0 ? 'can' : ''}" style="animation-delay:${n * 90}ms">${im}<div style="flex:1"><div class="t">${t}</div><div class="p">${fmt(p)} ziarenek</div>
        <div class="m ${m <= 0 ? 'ok' : ''}">${m <= 0 ? '✓ Możesz odebrać' : 'Brakuje ' + fmt(m)}</div><div class="pbar"><i style="width:0" data-w="${Math.min(100, 3200 / p * 100)}%"></i></div></div></div>`; }).join('');
      T(() => $$('.pbar i', list).forEach(i => i.style.width = i.dataset.w), 300);
    };
    let i = 0;
    const run = () => { const [k] = tabs[i % tabs.length]; const chip = $(`.chips span[data-k="${k}"]`, scr);
      if (i) tapEl(scr, chip);
      T(() => show(k), i ? 250 : 0); i++; T(run, 2800); };
    run();
  },

  /* 5. Odbiór nagrody: suwak, strumień ziarenek, nagroda na koncie */
  redeem(scr) {
    const slide = scr.closest('.slide'), spend = $('.js-spend', slide);
    scr.innerHTML = `<div class="rd">
      <div class="hero"><img src="${P}koko-burger.webp" alt=""><div class="bk">‹</div></div>
      <div class="bd"><div class="k">Z menu · nagroda</div><div class="t">Koko Burger</div>
        <div class="p">3 000 <i class="grain" style="width:13px;height:18px"></i></div>
        <div class="d">Nagroda trafi na Twoje konto. Odbierzesz ją w każdym lokalu Kurcze Pieczone po zeskanowaniu Mojej karty.</div>
        <div class="bal"><span>Twoje saldo</span><b class="js-b">3 200</b></div>
        <div class="swipe"><div class="fillr"></div><div class="kn">›</div><span>PRZESUŃ, ABY ODEBRAĆ</span></div></div>
      <div class="vch"><div class="t">Smacznego, Ania!</div><div class="s">Nagroda czeka na Twoim koncie</div>
        <div class="ok2"><img src="${P}koko-burger.webp" alt=""><div class="c"><b>Koko Burger</b><small>Pokaż Moją kartę przy kasie. Kasjer zobaczy nagrodę po zeskanowaniu.</small><span class="st">✓ Gotowa do odbioru</span></div></div>
        <img class="vm" src="assets/mascot.png" alt=""></div></div>`;
    const sw = $('.swipe', scr), v = $('.vch', scr), b = $('.js-b', scr);
    const run = () => {
      sw.classList.remove('go'); v.classList.remove('on'); b.textContent = '3 200'; if (spend) spend.textContent = '0';
      T(() => tapEl(scr, $('.kn', sw)), 1000);
      T(() => sw.classList.add('go'), 1300);
      T(() => { numTo(b, 3200, 200, 1300); if (spend) { numTo(spend, 0, 3000, 1500); grainStream(slide, b, spend); } }, 2300);
      T(() => { v.classList.add('on'); burst(scr); }, 4300);
      T(run, 9800);
    };
    run();
  },

  /* 6. Wysyłka gadżetu: kamienie milowe i jadąca furgonetka */
  ship(scr) {
    const st = [['Zamówione', 'pon. 2.11 · 12:40'], ['Spakowane w centrali', 'wt. 3.11 · 9:15'], ['W drodze', 'kurier · śr. 4.11'], ['Doręczone', 'czw. 5.11']];
    const short = ['Zamówione', 'Spakowane', 'W drodze', 'Doręczone'], pos = [0, 33.33, 66.66, 100];
    scr.innerHTML = `<div class="app">${sb}
      <div class="scr-h"><div class="t">Moje zamówienia</div><div class="s">Dostawa na adres z Twojego konta</div></div>
      <div class="shp">
        <div class="it"><div class="gx">${MUG}</div><div><div class="t">Kubek Kurcze Pieczone</div><div class="s">Zamówienie #KP-20418</div><div class="n">3 750 ziarenek</div></div></div>
        <div class="road"><div class="ln"><i></i>${pos.map((p, i) => `<span class="ms" style="left:${p}%"></span><span class="ml" style="left:${p}%">${short[i]}</span>`).join('')}</div><div class="tr">${TRUCK}</div></div>
        <div class="tsteps">${st.map(([l, s]) => `<div class="stp"><div class="o">✓</div><div class="l">${l}<small>${s}</small></div></div>`).join('')}</div>
      </div>${nav('user')}
      ${toastHTML('KURCZE PIECZONE · TERAZ', 'Twój kubek <b>właśnie dotarł</b>. Smacznej kawy!')}</div>`;
    const steps = $$('.stp', scr), ln = $('.ln i', scr), tr = $('.tr', scr), ms = $$('.ms', scr), ml = $$('.ml', scr), toast = $('.toast', scr);
    const set = n => {
      steps.forEach((s, i) => { s.classList.toggle('on', i <= n); s.classList.toggle('done', i < n || n === 3); });
      ms.forEach((m, i) => { m.classList.toggle('on', i <= n); m.classList.toggle('done', i < n || n === 3); });
      ml.forEach((m, i) => m.classList.toggle('on', i <= n));
      ln.style.width = pos[n] + '%'; tr.style.left = `calc(34px + (100% - 68px) * ${pos[n] / 100} - 19px)`; };
    const run = () => {
      toast.classList.remove('on'); set(0);
      T(() => set(1), 1300); T(() => set(2), 2600); T(() => set(3), 3900);
      T(() => { toast.classList.add('on'); burst(scr); }, 4600);
      T(() => toast.classList.remove('on'), 7600);
      T(run, 8600);
    };
    run();
  },

  /* 7. Mapa lokali: pinezki, trasa, karta lokalu z opinią */
  map(scr) {
    const pins = [[60, 175], [228, 150], [92, 330], [240, 300], [175, 230], [45, 450]];
    scr.innerHTML = `<div class="mp">
      <svg class="m" viewBox="0 0 278 598" preserveAspectRatio="xMidYMid slice">
        <rect width="278" height="598" fill="#f3ead9"/>
        <path d="M-20 520 C 60 470, 120 560, 300 470 L300 620 L-20 620z" fill="#bfe0f2"/>
        <rect x="150" y="360" width="110" height="70" rx="12" fill="#d5eac4"/>
        <rect x="20" y="90" width="70" height="50" rx="10" fill="#d5eac4"/>
        <g stroke="#fff" stroke-width="14" stroke-linecap="round" fill="none">
          <path d="M-10 210 L290 250"/><path d="M130 -10 L150 620"/><path d="M-10 380 L290 330"/><path d="M40 -10 L70 620"/><path d="M220 -10 L250 620"/></g>
        <g stroke="#fff" stroke-width="6" fill="none"><path d="M-10 120 L290 100"/><path d="M-10 290 L290 280"/><path d="M95 -10 L105 620"/><path d="M185 -10 L195 620"/></g>
        <path class="rpath" d="M118 410 L114 300 L150 292 L178 286" stroke="#bd0926" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
      <div class="srch">Szukaj lokalu lub miasta…</div>
      ${pins.map(([x, y]) => `<div class="pin" style="left:${x}px;top:${y}px">${PIN('#bd0926')}</div>`).join('')}
      <div class="pin big" style="left:178px;top:286px">${PIN('#ffc401')}</div>
      <div class="me" style="left:118px;top:410px"></div>
      <div class="sheet"><div class="gr"></div>
        <div class="r1"><div class="lg"></div><div><b>Kurcze Pieczone · Oława</b><small><span class="ok">Otwarte</span> · 400 m · 5 min pieszo</small></div></div>
        <div class="pr"><span class="tg">×2</span>Dziś Środa z Rożna w tym lokalu</div>
        <div class="go">Prowadź do lokalu</div>
        <div class="rev"><i>★★★★★</i> Wystaw opinię</div></div></div>`;
    const mp = $('.mp', scr), ps = $$('.pin', scr), sh = $('.sheet', scr);
    const run = () => {
      mp.classList.remove('rt'); sh.classList.remove('on'); ps.forEach(p => p.classList.remove('on'));
      ps.forEach((p, i) => T(() => p.classList.add('on'), 400 + i * 180));
      T(() => mp.classList.add('rt'), 2000);
      T(() => sh.classList.add('on'), 2900);
      T(() => tapEl(scr, $('.rev', sh)), 5600);
      T(run, 8400);
    };
    run();
  },

  /* Grywalizacja: pasek doświadczenia, awans na nowy poziom */
  levels(scr) {
    const R = 58, C = 2 * Math.PI * R;
    scr.innerHTML = `<div class="app">${sb}
      <div class="scr-h"><div class="t">Mój poziom</div></div>
      <div class="lvs">
        <div class="lvc"><div class="ringw"><svg viewBox="0 0 132 132"><circle cx="66" cy="66" r="${R}" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="10"/><circle class="rf" cx="66" cy="66" r="${R}" fill="none" stroke="#ffc401" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg><div class="in"></div></div>
          <div class="nm"><small class="js-lt">Poziom 1</small><span class="js-ln">Pisklę</span></div>
          <div class="xp"><div class="bar"><i class="js-xb"></i></div><div class="row"><span class="js-xv">3 200 / 5 000</span><span class="js-xn">1 800 do Kurczaka</span></div></div></div>
        <div class="pk"><div class="h">Odblokowane korzyści</div>
          <div class="p on"><i>✓</i>Bonus powitalny 250 ziarenek</div>
          <div class="p on"><i>✓</i>Prezent urodzinowy</div>
          <div class="p js-pk"><i>🔒</i>Wcześniejszy dostęp do nowości</div>
          <div class="p"><i>🔒</i>+10% ziarenek za każdy paragon</div></div>
      </div>${nav('user')}
      <div class="lvup"><div class="bdg"></div><div class="t1">Nowy poziom</div><div class="t2">Kurczak!</div><div class="t3">Odblokowano: wcześniejszy dostęp do nowości</div></div></div>`;
    const rf = $('.rf', scr), xb = $('.js-xb', scr), xv = $('.js-xv', scr), xn = $('.js-xn', scr), lt = $('.js-lt', scr), ln = $('.js-ln', scr), up = $('.lvup', scr), pk = $('.js-pk', scr);
    const set = (v, lo, hi) => { const p = (v - lo) / (hi - lo); rf.style.strokeDashoffset = C * (1 - p); xb.style.width = p * 100 + '%'; };
    const run = () => {
      up.classList.remove('on'); pk.classList.remove('on'); $('i', pk).textContent = '🔒';
      lt.textContent = 'Poziom 1'; ln.textContent = 'Pisklę'; xv.textContent = '3 200 / 5 000'; xn.textContent = '1 800 do Kurczaka';
      rf.style.transition = 'none'; xb.style.transition = 'none'; set(0, 0, 5000); void rf.getBoundingClientRect();
      rf.style.transition = ''; xb.style.transition = '';
      T(() => set(3200, 0, 5000), 300);
      T(() => { set(5000, 0, 5000); xn.textContent = 'Jeszcze chwila…'; }, 2300);
      T(() => { xv.textContent = '5 000 / 5 000'; up.classList.add('on'); burst(scr); burst(scr); }, 3800);
      T(() => { up.classList.remove('on'); lt.textContent = 'Poziom 2'; ln.textContent = 'Kurczak'; pk.classList.add('on'); $('i', pk).textContent = '✓';
        rf.style.transition = 'none'; xb.style.transition = 'none'; set(5000, 5000, 15000); void rf.getBoundingClientRect(); rf.style.transition = ''; xb.style.transition = '';
        xv.textContent = '5 000 / 15 000'; xn.textContent = '10 000 do Koguta'; T(() => set(5600, 5000, 15000), 200); }, 6600);
      T(run, 10400);
    };
    run();
  }
};

function runScene(s) {
  stopScenes();
  const name = s.dataset.scene; if (!name) return;
  const scr = $('[data-scr]', s);
  if (scenes[name]) scenes[name](scr);
}

/* ---------- start ---------- */
if (/static/.test(location.search)) document.body.classList.add("static");
renderApps();
const h = parseInt(location.hash.slice(1)); setActive(h>=1&&h<=N ? h-1 : 0);
})();
