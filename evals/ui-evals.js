const frame = document.querySelector('#target');
const resultsNode = document.querySelector('#results');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

frame.addEventListener('load', async () => {
  await wait(450);
  const win = frame.contentWindow;
  const doc = frame.contentDocument;
  const results = [];
  const check = (name, pass, detail = '') => results.push({ name, pass: Boolean(pass), detail });
  const withinViewport = el => { const r = el.getBoundingClientRect(); return r.left >= -1 && r.right <= win.innerWidth + 1; };

  check('No page-level horizontal overflow', doc.documentElement.scrollWidth <= win.innerWidth + 1, `${doc.documentElement.scrollWidth}px / ${win.innerWidth}px`);
  check('Primary cards stay inside viewport', [...doc.querySelectorAll('.card')].every(withinViewport));
  check('Evidence overlays hidden at rest', [...doc.querySelectorAll('.evidence-pop')].every(el => getComputedStyle(el).visibility === 'hidden'));

  doc.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'e', bubbles: true }));
  await wait(80);
  const visibleOverlays = [...doc.querySelectorAll('.evidence-pop')].filter(el => getComputedStyle(el).visibility === 'visible');
  check('Evidence mode does not open colliding tooltips', visibleOverlays.length === 0, `${visibleOverlays.length} overlay(s) visible`);
  check('Evidence mode exposes source markers', doc.querySelectorAll('.evidence-mode-chip').length === 5);

  doc.querySelector('[data-node="okta"]')?.focus();
  await wait(80);
  const tooltip = doc.querySelector('[data-node="okta"] .evidence-pop');
  const tooltipRect = tooltip?.getBoundingClientRect();
  check('Focused evidence tooltip stays inside card width', tooltipRect && tooltipRect.left >= 0 && tooltipRect.right <= win.innerWidth, tooltipRect ? `${Math.round(tooltipRect.left)}–${Math.round(tooltipRect.right)}px` : 'missing');
  doc.activeElement?.blur();

  const slider = doc.querySelector('#scrubber');
  slider?.focus();
  slider.value = '3';
  slider?.dispatchEvent(new win.Event('input', { bubbles: true }));
  check('Timeline scrubbing preserves slider focus', doc.activeElement === slider);

  doc.querySelector('[data-view="blast"]')?.click();
  await wait(80);
  check('Blast-radius transition works', Boolean(doc.querySelector('.asset-orbit')));
  doc.querySelector('[data-view="package"]')?.click();
  await wait(80);
  const authority = doc.querySelector('#authority-input');
  authority.value = 'Treasury multisig · 4/6';
  authority.dispatchEvent(new win.Event('input', { bubbles: true }));
  check('Material edits invalidate approval', doc.querySelector('#approve-package')?.disabled === true);
  check('Active progress step is announced', Boolean(doc.querySelector('.progress-step[aria-current="step"]')));

  window.__uiEvalResults = results;
  resultsNode.innerHTML = results.map(r => `<div class="result"><span>${r.name}${r.detail ? `<small style="display:block;color:#7b8088">${r.detail}</small>` : ''}</span><b class="${r.pass?'pass':'fail'}">${r.pass?'PASS':'FAIL'}</b></div>`).join('');
  document.title = results.every(r => r.pass) ? 'PASS · Cordant UI evaluations' : 'FAIL · Cordant UI evaluations';
});
