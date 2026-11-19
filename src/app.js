import { icons, steps, renderShell as libraryShell, renderPageHead } from './ui-library.js';

const app = document.querySelector('#app');

const state = {
  view: 'investigate',
  timeline: 4,
  replaying: false,
  evidence: false,
  capability: 'mint',
  packageReady: true,
  approvals: [false, false],
  executing: false,
  verification: 0,
  complete: false,
};

function shell(content) {
  return libraryShell(state, content);
}

function pageHead(eyebrow, title, subtitle, badge = '') {
  return renderPageHead(eyebrow, title, subtitle, badge);
}

const timelineEvents = [
  ['14:03','IAM revoked','done'], ['14:04','Custody removed','done'], ['14:06','Ethereum rotated','done'],
  ['14:07','Arbitrum rotated','done'], ['14:08','Solana missing','fail'], ['14:09','Ticket closed','future']
];

function lineage() {
  const visible = state.timeline;
  const nodes = [
    ['person', icons.user, 'Employee M. Chen', 'Revoked 14:03', 'Okta event EVT-90214 · immutable audit log'],
    ['okta', icons.layers, 'Okta identity', 'Disabled', 'Identity m.chen@northstar.finance · source Okta'],
    ['custody', icons.shield, 'Fireblocks custody', 'Access removed', 'Workspace EU-01 · role removed 14:04:18'],
    ['key', icons.key, 'Signing key', 'MPC key 7F2A', 'Policy key · quorum 3/5 · last used 13:42'],
    ['solana', '≋', 'Solana USDC mint', 'Slot 284,991,442', 'Observed authority: revoked operator · finalized slot']
  ];
  return `<div class="lineage" id="lineage">
    ${nodes.map((n,i)=>{
      const node = `<div class="lineage-node ${i===4?'danger':''}" data-node="${n[0]}" tabindex="0"><span class="node-icon">${n[1]}</span><span><div class="node-title">${n[2]}</div><div class="node-meta">${n[3]}</div></span><span class="evidence-mode-chip" aria-hidden="true">EVIDENCE</span><div class="evidence-pop" role="tooltip"><b>Verified evidence</b><br>${n[4]}</div></div>`;
      if(i===nodes.length-1) return node;
      const broken = i===3;
      const edgeVisible = visible >= i;
      return node + `<div class="edge ${broken?'broken':''}" style="opacity:${edgeVisible?1:.18};animation-delay:${i*100}ms"></div>`;
    }).join('')}
  </div>`;
}

function diffCard() {
  return `<section class="card diff-card"><div class="card-head"><div><h2>Expected vs observed</h2><div class="card-subtitle">Policy compared with finalized chain state</div></div><span class="badge green">2 of 3</span></div>
    <div class="diff-table" id="diff-table">
      <div class="diff-row header"><span>Network</span><span>Expected authority</span><span>Observed authority</span></div>
      <div class="diff-row"><span class="network"><i class="chain-glyph">◇</i>Ethereum</span><span>Treasury 3/5</span><span>Treasury 3/5 <b class="ok">✓</b></span></div>
      <div class="diff-row"><span class="network"><i class="chain-glyph">⬡</i>Arbitrum</span><span>Treasury 3/5</span><span>Treasury 3/5 <b class="ok">✓</b></span></div>
      <div class="diff-row"><span class="network"><i class="chain-glyph">≋</i>Solana</span><span>Treasury 3/5</span><span class="mismatch">Revoked operator <b>×</b></span></div>
      <div class="diff-handle" id="diff-handle"></div><button class="diff-knob" id="diff-knob" aria-label="Drag to compare"></button>
    </div></section>`;
}

function investigationCard() {
  const claims = [
    ['verified', icons.user, 'IAM identity revoked · Okta', '14:03', 'Okta audit event EVT-90214 confirms the identity was disabled by J. Reyes.', 'person,okta'],
    ['verified', icons.layers, 'Ethereum + Arbitrum authorities changed', '14:06', 'Finalized transactions match approved package hash on both networks.', 'custody,key'],
    ['inferred', icons.bolt, 'Solana runbook step may have been skipped', '14:08', 'The approved runbook includes Solana, but no submitted transaction or custody request was found.', 'key,solana'],
    ['unknown', icons.doc, 'Transaction prepared but not submitted', '14:08', 'No draft payload was retained. Cordant cannot verify whether preparation began.', 'solana']
  ];
  return `<section class="card investigation"><div class="card-head"><div><h2>Investigation</h2></div><span class="badge blue">AI-assisted</span></div><div class="invest-summary">Solana USDC mint authority remains assigned to a revoked employee. Evidence suggests a missed runbook step.</div>
    ${claims.map(c=>`<div class="claim" data-nodes="${c[5]}" tabindex="0"><span class="node-icon">${c[1]}</span><span><div class="claim-type ${c[0]}">${c[0].toUpperCase()}</div><div>${c[2]}</div></span><time class="claim-time">${c[3]}</time><div class="claim-source">${c[4]}<br><button class="source-link">Open source evidence ↗</button></div></div>`).join('')}
  </section>`;
}

function timelineCard() {
  return `<section class="card timeline-card"><div class="card-head"><div><h2>Incident flight recorder</h2><div class="card-subtitle">Scrub across systems to reconstruct control state</div></div><span class="mono">Window 14:03–14:09 UTC</span></div>
    <div class="timeline-controls"><button class="play" id="replay" aria-label="Replay">${state.replaying?'Ⅱ':'▷'}</button><span>${state.replaying?'Replaying evidence':'Replay incident'}</span><span style="margin-left:auto;color:var(--ink-3)">Press R to replay · E for evidence</span></div>
    <div class="timeline-wrap"><div class="timeline-track"></div><div class="timeline-events">${timelineEvents.map((e,i)=>`<div class="event ${i<state.timeline?'done':''} ${i===state.timeline?e[2]:''} ${i>state.timeline?'future':''}"><div class="event-dot">${i<state.timeline?'✓':''}</div><div class="event-time">${e[0]}</div><div class="event-label">${e[1]}</div></div>`).join('')}</div></div>
    <input class="scrubber" id="scrubber" type="range" min="0" max="5" value="${state.timeline}" aria-label="Incident timeline position" />
  </section>`;
}

function investigateView() {
  return shell(`<main class="container view"><div class="crumbs"><span>Incidents</span><span>/</span><span>Authority controls</span><span>/</span><b>INC-4827</b></div>
    ${pageHead('Critical authority exception','Revoked employee still controls USDC mint authority on Solana','Detected 14:08 · 2 of 3 networks compliant · Exposure $84.2M','<span class="badge red">Open</span><button class="button" data-view="blast">View blast radius</button>')}
    <div class="incident-grid"><div class="left-stack"><section class="card lineage-card"><div class="card-head"><div><h2>Authority lineage</h2><div class="card-subtitle">How control moved from identity to on-chain authority</div></div><span class="badge green">12 verified sources</span></div>${lineage()}</section>${timelineCard()}</div><aside class="right-stack">${diffCard()}${investigationCard()}</aside></div>
  </main>`);
}

function blastView() {
  return shell(`<main class="container view"><div class="crumbs"><span>INC-4827</span><span>/</span><b>Blast radius</b></div>${pageHead('Material exposure','What can this authority still do?','Capabilities resolved from the current Solana mint configuration','<span class="badge red">$84.2M exposed</span>')}
    <div class="metric-row"><section class="card metric"><div class="metric-label">Issued assets exposed</div><div class="metric-value">$84.2M</div><div class="metric-label">Across 6 treasury programs</div></section><section class="card metric"><div class="metric-label">Active capabilities</div><div class="metric-value">3</div><div class="metric-label">1 classified critical</div></section><section class="card metric"><div class="metric-label">Legal entities</div><div class="metric-value">4</div><div class="metric-label">US · EU · SG · UK</div></section></div>
    <div class="section-grid"><section class="card asset-orbit"><div class="orbit-center"><div><b style="font-size:18px">Stale authority</b><br><span style="opacity:.65;font-size:12px">M. Chen · 7F2A</span></div></div>${[['a1','USDC Treasury','mint'],['a2','EU Settlement','mint'],['a3','SG Liquidity','freeze'],['a4','UK Reserve','delegate'],['a5','Merchant Float','mint'],['a6','Institutional OTC','freeze']].map(([p,l,c])=>`<div class="asset ${p} ${state.capability!==c?'dim':''}" data-cap="${c}">${l}</div>`).join('')}</section>
      <section class="card"><div class="card-head"><div><h2>Remaining capabilities</h2><div class="card-subtitle">Select to isolate affected assets</div></div></div><div class="capability-list">${[['mint','Mint USDC','$84.2M'],['freeze','Freeze accounts','$21.8M'],['delegate','Delegate authority','$12.1M']].map(c=>`<button class="capability ${state.capability===c[0]?'active':''}" data-capability="${c[0]}"><span><b>${c[1]}</b><br><small style="color:var(--ink-3)">Observed at slot 284,991,442</small></span><b>${c[2]}</b></button>`).join('')}</div><div style="padding:0 20px 20px"><button class="button primary" style="width:100%" data-view="package">Prepare remediation package →</button></div></section></div>
  </main>`);
}

function packageView() {
  const items = [['Policy clause','CA-7.4 · Terminated identities'],['Target state','Solana · Treasury multisig 3/5'],['Transaction','SetAuthority · MintTokens'],['Runbook','RB-118 · Authority rotation'],['Approvers','Security owner + Treasury signer'],['Verification','Finalized chain state + policy re-evaluation']];
  return shell(`<main class="container view"><div class="crumbs"><span>INC-4827</span><span>/</span><b>Remediation package</b></div>${pageHead('Read-only remediation','Compile a reviewable control package','Cordant prepares evidence and parameters. Execution remains in the approved custody system.',state.packageReady?'<span class="badge green">Ready for approval</span>':'<span class="badge amber">Approval invalidated</span>')}
    <div class="package-layout"><section class="card"><div class="card-head"><div><h2>Package compiler</h2><div class="card-subtitle">Every requirement must resolve before approval</div></div><span class="mono">6 / 6 checks</span></div><div class="compile-list">${items.map((x,i)=>`<div class="compile-item"><span class="compile-check">✓</span><span><b>${x[0]}</b><br><small style="color:var(--ink-3)">${x[1]}</small></span><span class="mono">${['POLICY','TARGET','IX','RUNBOOK','SOD','PROOF'][i]}</span></div>`).join('')}</div></section>
      <aside class="card package-side"><h2>Transaction parameters</h2><div class="card-subtitle">Human-readable custody payload</div><div class="field"><label>CURRENT AUTHORITY</label><input value="7F2A…91CD" readonly /></div><div class="field"><label>NEW AUTHORITY</label><input id="authority-input" value="Treasury multisig · 3/5" /></div><div class="field"><label>PROGRAM</label><input value="Tokenkeg…Q5DA" readonly /></div><div class="notice">Editing a material parameter invalidates approvals because they are bound to the package hash.</div><label style="color:var(--ink-3);font-size:11px">PACKAGE HASH</label><div class="hash mono">sha256:9ef1a32bd7c4…82a16f</div><button class="button primary" id="approve-package" style="width:100%;margin-top:16px" ${!state.packageReady?'disabled':''}>Send for two-person approval</button></aside></div>
  </main>`);
}

function approvalView() {
  const people = [['JR','Jordan Reyes','Security Control Owner'],['AP','Amina Patel','Treasury Signer']];
  return shell(`<main class="container view"><div class="crumbs"><span>INC-4827</span><span>/</span><b>Two-person approval</b></div>${pageHead('Segregation of duties','Bind approval to the exact package','Any material parameter change produces a new hash and resets affected approvals','<span class="badge blue">Hash 9ef1…82a1</span>')}
    <section class="card"><div class="card-head"><div><h2>Required attestations</h2><div class="card-subtitle">Hold to review and attest. Cordant records approval but cannot execute.</div></div><span class="mono">Policy CA-7.4</span></div><div class="approval-grid">${people.map((p,i)=>`<article class="approver ${state.approvals[i]?'approved':''}"><div class="approver-head"><div class="person"><span class="person-avatar">${p[0]}</span><span><b>${p[1]}</b><br><small style="color:var(--ink-3)">${p[2]}</small></span></div>${state.approvals[i]?'<span class="badge green">Approved</span>':'<span class="badge amber">Required</span>'}</div><div style="margin-top:22px;color:var(--ink-2);line-height:1.5">I attest that package <span class="mono">9ef1…82a1</span> restores the approved Solana mint authority and matches policy CA-7.4.</div>${state.approvals[i]?'<div class="success-seal"><b>✓</b><span>Cryptographically bound to package hash<br><small>Recorded moments ago</small></span></div>':`<button class="hold" data-approver="${i}"><i class="hold-fill"></i><span>Hold to attest · 1.1 seconds</span></button>`}</article>`).join('')}</div></section>
    <div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="button primary" id="handoff" ${state.approvals.every(Boolean)?'':'disabled'}>Mark as submitted externally →</button></div>
  </main>`);
}

function executionView() {
  const items = ['Transaction detected','Instruction decoded','Authority changed','32 confirmations','Policy re-evaluated'];
  const doneCount = state.complete ? 5 : state.verification;
  return shell(`<main class="container view"><div class="crumbs"><span>INC-4827</span><span>/</span><b>Independent verification</b></div>${pageHead('External execution','Verify what actually happened on-chain','Cordant observes the transaction independently and re-tests the control.',state.complete?'<span class="badge green">Control restored</span>':'<span class="badge blue">Observing Solana</span>')}
    <div class="execution"><section class="card finality"><div><div class="ring" style="--p:${state.complete?100:Math.min(100,state.verification*22)}"><div class="ring-content"><div class="ring-value">${state.complete?'32':Math.max(0,state.verification*7)}</div><div style="color:var(--ink-3)">confirmations</div></div></div><h2 style="margin-top:24px">${state.complete?'Finalized':'Waiting for finality'}</h2><div class="card-subtitle">Solana · tx 5vN9…7Qp2</div>${!state.executing&&!state.complete?'<button class="button blue" id="start-verification" style="margin-top:18px">Simulate external submission</button>':''}</div></section>
      <section class="card"><div class="card-head"><div><h2>Verification sequence</h2><div class="card-subtitle">Independent evidence, evaluated in order</div></div><span class="mono">slot 284,992,108</span></div><div class="verification-list">${items.map((x,i)=>`<div class="verify-item ${i<doneCount?'done':i===doneCount&&state.executing?'running':''}"><span class="verify-icon">${i<doneCount?'✓':''}</span><span><b>${x}</b><br><small style="color:var(--ink-3)">${['Observed from independent RPC','SetAuthority · MintTokens','Treasury multisig 3/5','Finalized commitment','CA-7.4 now passing'][i]}</small></span><span class="mono">${i<doneCount?'VERIFIED':i===doneCount&&state.executing?'RUNNING':'PENDING'}</span></div>`).join('')}${state.complete?'<div class="success-seal"><b style="font-size:20px">✓</b><span><b>Control restored and independently verified</b><br><small>The stale authority is no longer capable of minting USDC.</small></span></div>':''}</div></section></div>
  </main>`);
}

function portfolioView() {
  const rows = [
    ['INC-4827','Revoked operator retains mint authority','Solana','$84.2M','Critical','now'],
    ['INC-4819','Signer quorum below policy minimum','Ethereum','$18.4M','High','2m'],
    ['INC-4806','Custody role missing legal-entity owner','Arbitrum','$6.1M','Medium','8m'],
    ['INC-4792','Emergency pause authority untested','Base','$3.8M','Medium','14m']
  ];
  return shell(`<main class="container view">${pageHead('Authority portfolio','Continuous authority coverage','Live reconciliation across identity, custody, policy and finalized chain state','<span class="badge green">Evidence current</span>')}
    <div class="metric-row"><section class="card metric"><div class="metric-label">Authority controls</div><div class="metric-value">142</div><div class="metric-label">96.4% passing</div></section><section class="card metric"><div class="metric-label">Material exposure</div><div class="metric-value">$112M</div><div class="metric-label">Across 4 open exceptions</div></section><section class="card metric"><div class="metric-label">Median evidence age</div><div class="metric-value">42s</div><div class="metric-label">4 networks observed</div></section></div>
    <section class="card"><div class="card-head"><div><h2>Authority exceptions</h2><div class="card-subtitle">Prioritized by capability, exposure and evidence confidence</div></div><button class="button" id="export-evidence">Export evidence</button></div><table class="portfolio-table"><thead><tr><th>ID</th><th>Exception</th><th>Network</th><th>Exposure</th><th>Severity</th><th>Evidence</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td class="mono">${r[0]}</td><td>${i===0?`<button class="table-link" data-view="investigate">${r[1]}</button>`:`<span>${r[1]}</span>`}</td><td>${r[2]}</td><td>${r[3]}</td><td><span class="badge ${r[4]==='Critical'?'red':r[4]==='High'?'amber':'blue'}">${r[4]}</span></td><td><span class="freshness"><i class="fresh-dot"></i>${r[5]}</span></td></tr>`).join('')}</tbody></table></section>
  </main>`);
}

function render() {
  const view = state.view === 'investigate' ? investigateView() : state.view === 'blast' ? blastView() : state.view === 'package' ? packageView() : state.view === 'approval' ? approvalView() : state.view === 'execution' || state.view === 'verify' ? executionView() : portfolioView();
  app.innerHTML = view;
  document.body.classList.toggle('show-evidence', state.evidence);
  bind();
}

function toast(message) {
  const el = document.createElement('div'); el.className='toast'; el.textContent=message;
  document.querySelector('#toast-region').append(el); setTimeout(()=>el.remove(),2600);
}

let replayTimer;
function replay() {
  clearInterval(replayTimer); state.timeline=0; state.replaying=true; render();
  replayTimer=setInterval(()=>{ state.timeline++; if(state.timeline>=5){clearInterval(replayTimer);state.replaying=false;} render(); },720);
}

function updateTimeline(value) {
  state.timeline = value;
  document.querySelectorAll('.event').forEach((el, i) => {
    el.classList.toggle('done', i < value);
    el.classList.toggle('fail', i === value && timelineEvents[i][2] === 'fail');
    el.classList.toggle('future', i > value);
    const dot = el.querySelector('.event-dot');
    if (dot) dot.textContent = i < value ? '✓' : '';
  });
  document.querySelectorAll('.edge').forEach((el, i) => { el.style.opacity = value >= i ? '1' : '.18'; });
}

function bind() {
  document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',()=>{state.view=el.dataset.view;render();window.scrollTo({top:0,behavior:'smooth'});}));
  document.querySelector('#scrubber')?.addEventListener('input',e=>updateTimeline(+e.target.value));
  document.querySelector('#replay')?.addEventListener('click',replay);
  document.querySelectorAll('.claim').forEach(el=>{
    const highlight=()=>el.dataset.nodes.split(',').forEach(n=>document.querySelector(`[data-node="${n}"]`)?.classList.add('highlight'));
    const clear=()=>document.querySelectorAll('.lineage-node').forEach(n=>n.classList.remove('highlight'));
    el.addEventListener('mouseenter',highlight); el.addEventListener('focus',highlight);
    el.addEventListener('mouseleave',clear); el.addEventListener('blur',clear);
    el.addEventListener('click',e=>{if(!e.target.matches('.source-link'))el.classList.toggle('active')});
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.classList.toggle('active')}});
  });
  const knob=document.querySelector('#diff-knob'), table=document.querySelector('#diff-table'), handle=document.querySelector('#diff-handle');
  if(knob&&table){let drag=false; const move=e=>{if(!drag)return;const r=table.getBoundingClientRect();const x=Math.max(18,Math.min(92,(e.clientX-r.left)/r.width*100));knob.style.left=handle.style.left=x+'%';};knob.onpointerdown=e=>{drag=true;knob.setPointerCapture(e.pointerId)};knob.onpointermove=move;knob.onpointerup=()=>drag=false;}
  document.querySelectorAll('[data-capability]').forEach(el=>el.addEventListener('click',()=>{state.capability=el.dataset.capability;render();}));
  document.querySelector('#authority-input')?.addEventListener('input',()=>{state.packageReady=false;state.approvals=[false,false];document.querySelector('#approve-package').disabled=true;toast('Material change detected · approvals cleared and package hash invalidated');});
  document.querySelector('#approve-package')?.addEventListener('click',()=>{state.view='approval';render();});
  document.querySelectorAll('.hold').forEach(btn=>{let timer;const approve=()=>{state.approvals[+btn.dataset.approver]=true;toast('Attestation bound to package hash');render()};const begin=e=>{if(e?.key&&!['Enter',' '].includes(e.key))return;e?.preventDefault();if(timer)return;btn.classList.add('holding');timer=setTimeout(approve,1100)};const cancel=e=>{if(e?.key&&!['Enter',' ','Escape'].includes(e.key))return;clearTimeout(timer);timer=null;btn.classList.remove('holding')};btn.onpointerdown=begin;btn.onpointerup=cancel;btn.onpointerleave=cancel;btn.onpointercancel=cancel;btn.onblur=cancel;btn.onkeydown=begin;btn.onkeyup=cancel;});
  document.querySelector('#handoff')?.addEventListener('click',()=>{state.view='execution';toast('External execution handoff recorded');render();});
  document.querySelector('#start-verification')?.addEventListener('click',()=>{state.executing=true;state.verification=0;render();const t=setInterval(()=>{state.verification++;if(state.verification>=5){clearInterval(t);state.complete=true;state.executing=false;}render();},780);});
  document.querySelector('#search-button')?.addEventListener('click',()=>toast('Search is outside this prototype flow'));
  document.querySelector('#profile-button')?.addEventListener('click',()=>toast('Signed in as Liya Chen · Prototype mode'));
  document.querySelectorAll('.source-link').forEach(el=>el.addEventListener('click',()=>toast('Evidence source opened in the audit drawer')));
  document.querySelector('#export-evidence')?.addEventListener('click',()=>toast('Evidence export prepared · Prototype mode'));
}

document.addEventListener('keydown',e=>{
  if(e.target.matches('input'))return;
  if(e.key.toLowerCase()==='r'&&state.view==='investigate')replay();
  if(e.key.toLowerCase()==='e'){state.evidence=!state.evidence;document.body.classList.toggle('show-evidence',state.evidence);toast(state.evidence?'Evidence source markers shown':'Evidence source markers hidden');}
  const n=Number(e.key);if(n>=1&&n<=5){state.view=steps[n-1][0];render();}
});

render();
