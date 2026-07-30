const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const ROOT = __dirname;
const OUTPUT_FILE = path.join(ROOT, 'deploy', 'index.html');

// Configure nunjucks with the project root as the search path.
// This means all include/extends paths are relative to the repo root,
// e.g. "templates/base.njk", "components/modals/roblox.njk".
nunjucks.configure(ROOT, {
  autoescape: false,   // we're outputting raw HTML — don't escape it
  trimBlocks: false,
  lstripBlocks: false,
  noCache: true,
});

const html = nunjucks.render('templates/index.njk');
fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
console.log(`Built → ${path.relative(ROOT, OUTPUT_FILE)}`);
