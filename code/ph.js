/* PowerHouse Code · interaction layer (no framework) · scenes, choose/apply flow, streaming, timers */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  window.toast=function(m){ const t=document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(()=>t.remove(),2600); };
  // scenes: elements with data-scene are shown one at a time per group
  window.scene=function(group,name){
    $$('[data-scene]').filter(e=>e.dataset.group===group).forEach(e=>{ e.hidden=e.dataset.scene!==name; });
    $$('[data-scene-tab]').filter(e=>e.dataset.group===group).forEach(e=>e.setAttribute('aria-selected',String(e.dataset.sceneTab===name)));
    document.body.dataset['scene_'+group]=name;
    // right panel only on scenes that list it
    const shell=$('.shell'); if(shell&&shell.dataset.panelScenes){ const on=shell.dataset.panelScenes.split(',').includes(name); shell.classList.toggle('has-panel',on); const p=$('.panel'); if(p) p.hidden=!on; }
    window.scrollTo({top:0});
  };
  // choose / apply flow
  const state={chosen:null};
  function choose(letter){
    state.chosen=letter;
    $$('.run[data-cand]').forEach(r=>{ const me=r.dataset.cand===letter; r.classList.toggle('is-chosen',me); r.classList.toggle('is-out',!me); const b=$('[data-choose]',r); if(b){ b.textContent=me?'Chosen':'Choose '+r.dataset.cand; b.classList.toggle('btn-primary',me); } });
    $$('[data-why]').forEach(w=>{ w.hidden=false; $$('.cl',w).forEach(x=>x.textContent=letter); });
    $$('[data-apply]').forEach(a=>{ a.disabled=false; $$('.cl',a).forEach(x=>x.textContent=letter); });
    showDiff(letter);
  }
  function showDiff(letter){ $$('[data-diff]').forEach(d=>d.hidden=d.dataset.diff!==letter); $$('[data-panel]').forEach(t=>t.setAttribute('aria-selected',String(t.dataset.panel===letter))); $$('.cl-panel').forEach(x=>x.textContent=letter); }
  window.showDiff=showDiff;
  document.addEventListener('click',e=>{
    const ch=e.target.closest('[data-choose]'); if(ch){ choose(ch.dataset.choose); return; }
    const pn=e.target.closest('[data-panel]'); if(pn){ showDiff(pn.dataset.panel); return; }
    const ap=e.target.closest('[data-apply]'); if(ap){ const L=state.chosen||'B'; $$('.cl-final').forEach(x=>x.textContent=L); const why=$$('.chip[aria-pressed="true"]',$('[data-why]')||document).map(c=>c.textContent.trim().toLowerCase()).join(', ')||'no reason given'; $$('.why-final').forEach(x=>x.textContent=why); scene(ap.dataset.group||'t',ap.dataset.apply); toast('Applied '+L+' · PR #142 opened'); return; }
    const go=e.target.closest('[data-go]'); if(go){ const [g,n]=go.dataset.go.split(':'); scene(g,n); if(go.dataset.toast) toast(go.dataset.toast); return; }
    const t=e.target.closest('[data-toast]'); if(t&&!t.dataset.go){ toast(t.dataset.toast); }
    const sw=e.target.closest('.switch'); if(sw){ sw.setAttribute('aria-checked',String(sw.getAttribute('aria-checked')!=='true')); }
    const chip=e.target.closest('.chip[data-toggle]'); if(chip){ chip.setAttribute('aria-pressed',String(chip.getAttribute('aria-pressed')!=='true')); }
    const seg=e.target.closest('.seg button'); if(seg){ $$('button',seg.parentElement).forEach(b=>b.setAttribute('aria-selected',String(b===seg))); }
    const tab=e.target.closest('[data-tab]'); if(tab){ e.preventDefault(); const scope=tab.closest('[data-tabs]')||document; const name=tab.dataset.tab; $$('[data-tab]',scope).forEach(x=>{ const on=x.dataset.tab===name; if(x.classList.contains('tab')) x.setAttribute('aria-selected',String(on)); }); $$('[data-tabpanel]',scope).forEach(p=>p.hidden=p.dataset.tabpanel!==name); }
  });
  // Enter in a composer sends (shift+enter = newline)
  document.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&e.target.matches('.composer textarea')){ const btn=$('[data-go]',e.target.closest('.composer')); if(btn){ e.preventDefault(); btn.click(); } } });
  // timers: data-timer="mm:ss" counts down; data-elapsed counts up
  $$('[data-timer]').forEach(el=>{ let [m,s]=el.dataset.timer.split(':').map(Number); setInterval(()=>{ if(s===0){ if(m===0) return; m--; s=59; } else s--; el.textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'); },1000); });
  $$('[data-elapsed]').forEach(el=>{ let t=parseInt(el.dataset.elapsed||'0',10); setInterval(()=>{ t++; el.textContent=String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0'); },1000); });
  // streaming lines: [data-stream] reveals its .st children one by one when shown
  function arm(el){ const lines=$$('.st',el); lines.forEach(l=>l.hidden=true); const step=parseInt(el.dataset.step||'700',10); const start=parseInt(el.dataset.start||'0',10); lines.forEach((l,i)=>setTimeout(()=>{ l.hidden=false; },start+i*step)); }
  // auto-advance: data-after="group:name" with data-delay ms when shown
  const obs=new MutationObserver(()=>{
    $$('[data-after]').forEach(el=>{ if(!el.hidden&&!el.dataset.armed){ el.dataset.armed='1'; const [g,n]=el.dataset.after.split(':'); setTimeout(()=>scene(g,n),parseInt(el.dataset.delay||'1800',10)); } });
    $$('[data-stream]').forEach(el=>{ const vis=!el.closest('[hidden]'); if(vis&&!el.dataset.armed){ el.dataset.armed='1'; arm(el); } });
  });
  obs.observe(document.body,{attributes:true,subtree:true,attributeFilter:['hidden']});
  // initial scenes
  $$('[data-scene-init]').forEach(el=>scene(el.dataset.group,el.dataset.sceneInit));
  $$('[data-stream]').forEach(el=>{ if(!el.closest('[hidden]')&&!el.dataset.armed){ el.dataset.armed='1'; arm(el); } });
})();
