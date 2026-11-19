const base = process.env.CORDANT_URL || 'http://127.0.0.1:4317';

try {
  const response = await fetch(`${base}/`);
  const html = await response.text();
  const checks = [
    ['server responds', response.ok],
    ['prototype mount exists', html.includes('id="app"')],
    ['UI module is loaded', html.includes('./src/app.js')],
    ['evaluation page is reachable', (await fetch(`${base}/evals/ui-evals.html`)).ok]
  ];
  for (const [name, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}`);
  if (checks.some(([, pass]) => !pass)) process.exitCode = 1;
  else console.log(`\nOpen ${base}/evals/ui-evals.html for geometry and interaction evaluations.`);
} catch (error) {
  console.error(`FAIL  prototype server unavailable at ${base}`);
  console.error(error.message);
  process.exitCode = 1;
}
