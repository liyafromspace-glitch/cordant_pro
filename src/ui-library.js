export const icons = {
  search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.3-6 8-6s7.3 2 8 6"/></svg>',
  layers: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>',
  shield: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3 4.5 6v5.5c0 4.5 2.8 7.7 7.5 9.5 4.7-1.8 7.5-5 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  key: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 3 3m-6 0 3 3"/></svg>',
  bolt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/></svg>',
  doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>'
};

export const steps = [
  ['investigate', 'Investigate'], ['package', 'Prepare package'],
  ['approval', 'Two-person approval'], ['execution', 'External execution'], ['verify', 'Verify']
];

const shortStepLabels = { investigate: 'Investigate', package: 'Package', approval: 'Approve', execution: 'Execute', verify: 'Verify' };

export function renderShell(state, content) {
  const stepIndex = Math.max(0, steps.findIndex(s => s[0] === state.view));
  return `<div class="app-shell"><header class="topbar"><div class="brand"><span class="brand-mark"></span>Cordant</div><nav class="nav" aria-label="Primary">${[['investigate','Incidents'],['portfolio','Authorities'],['blast','Controls'],['investigate','Evidence']].map(([v,l])=>`<button class="nav-btn ${state.view===v?'active':''}" data-view="${v}">${l}</button>`).join('')}</nav><div class="top-actions"><button class="icon-button" id="search-button" aria-label="Search">${icons.search}</button><button class="icon-button avatar" id="profile-button" aria-label="Profile">LC</button></div></header>${content}<nav class="progress-rail" aria-label="Incident progress">${steps.map(([v,l],i)=>`<button class="progress-step ${state.view===v?'active':''} ${i<stepIndex || state.complete?'complete':''}" data-view="${v}" ${state.view===v?'aria-current="step"':''}><i class="progress-dot"></i><span class="progress-label" data-short="${shortStepLabels[v]}">${l}</span></button>`).join('')}</nav></div>`;
}

export function renderPageHead(eyebrow, title, subtitle, badge = '') {
  return `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><div class="subtitle">${subtitle}</div></div>${badge?`<div class="head-meta">${badge}</div>`:''}</div>`;
}
