/* fortune. v2 · minimal interaction layer (no framework) */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  window.toast=function(m){ const t=document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); };
  // scenes: elements with data-scene are shown one at a time per group
  window.scene=function(group,name){ $$('[data-scene]').filter(e=>e.dataset.group===group).forEach(e=>{ e.hidden=e.dataset.scene!==name; }); $$('[data-scene-tab]').filter(e=>e.dataset.group===group).forEach(e=>e.setAttribute('aria-selected',String(e.dataset.sceneTab===name))); const first=$$('[data-scene]').find(e=>e.dataset.group===group&&!e.hidden); if(first) first.scrollIntoView({block:'nearest'}); };
  document.addEventListener('click',e=>{
    const go=e.target.closest('[data-go]'); if(go){ const [g,n]=go.dataset.go.split(':'); scene(g,n); if(go.dataset.toast) toast(go.dataset.toast); return; }
    const t=e.target.closest('[data-toast]'); if(t&&!t.dataset.go){ toast(t.dataset.toast); }
    const sw=e.target.closest('.switch'); if(sw){ sw.setAttribute('aria-checked',String(sw.getAttribute('aria-checked')!=='true')); }
    const ch=e.target.closest('.chip[data-toggle]'); if(ch){ ch.setAttribute('aria-pressed',String(ch.getAttribute('aria-pressed')!=='true')); }
    const tab=e.target.closest('[data-tab]'); if(tab){ e.preventDefault(); const scope=tab.closest('[data-tabs]')||document; const name=tab.dataset.tab; $$('[data-tab]',scope).forEach(x=>{ const on=x.dataset.tab===name; if(x.classList.contains('tab')) x.setAttribute('aria-selected',String(on)); if(x.closest('.nav')){ if(on) x.setAttribute('aria-current','page'); else x.removeAttribute('aria-current'); } }); $$('[data-tabpanel]',scope).forEach(p=>p.hidden=p.dataset.tabpanel!==name); window.scrollTo(0,0); }
  });
  // timers: data-timer="mm:ss" counts down
  $$('[data-timer]').forEach(el=>{ let [m,s]=el.dataset.timer.split(':').map(Number); const tick=()=>{ if(s===0){ if(m===0) return; m--; s=59; } else s--; el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); }; setInterval(tick,1000); });
  // elapsed: data-elapsed counts up from 0
  $$('[data-elapsed]').forEach(el=>{ let t=parseInt(el.dataset.elapsed||'0',10); setInterval(()=>{ t++; el.textContent=String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0'); },1000); });
  // auto-advance: data-after="group:name" with data-delay ms when shown
  const obs=new MutationObserver(()=>{ $$('[data-after]').forEach(el=>{ if(!el.hidden&&!el.dataset.armed){ el.dataset.armed='1'; const [g,n]=el.dataset.after.split(':'); setTimeout(()=>scene(g,n),parseInt(el.dataset.delay||'1800',10)); } }); });
  obs.observe(document.body,{attributes:true,subtree:true,attributeFilter:['hidden']});
  // initial scenes
  $$('[data-scene-init]').forEach(el=>scene(el.dataset.group,el.dataset.sceneInit));
})();
