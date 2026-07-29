const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, 'components');
const TEMPLATE_FILE = path.join(__dirname, 'template.html');
const OUTPUT_FILE = path.join(__dirname, 'deploy', 'index.html');

const includeRe = /\{\{include:([a-zA-Z0-9_-]+)\}\}/g;

function resolveInclude(match, name) {
  const filePath = path.join(COMPONENTS_DIR, name + '.html');
  if (!fs.existsSync(filePath)) {
    console.error(`Warning: component "${name}" not found at ${filePath}`);
    return `<!-- MISSING COMPONENT: ${name} -->`;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  return content.replace(includeRe, resolveInclude);
}

function build() {
  let template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  let result = template.replace(includeRe, resolveInclude);
  fs.writeFileSync(OUTPUT_FILE, result, 'utf8');
  console.log(`Built → ${OUTPUT_FILE}`);
}

build();
