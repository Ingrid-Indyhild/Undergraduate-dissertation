const { execSync, spawn } = require('child_process');
const readline = require('readline');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Config ──────────────────────────────────────────────────────────────────
const PORT = 3000;
const LABS_DIR = path.resolve(__dirname, '.../labs check'); // folder where your HTML files live

const LAB_MAP = {
  '1': { spec: 'cypress/e2e/lab1.cy.js', pages: ['index.html', 'sample3.html']},
  '3': { spec: 'cypress/e2e/lab3.cy.js', pages: ['Lab.3.1.html', 'Lab.3.2.html'] },
  '4': { spec: 'cypress/e2e/lab4.cy.js', pages: ['Lab.4.html'] },
  '5': { spec: 'cypress/e2e/lab5.cy.js', pages: ['Lab.5.html'] },
  '6': { spec: 'cypress/e2e/lab6.cy.js', pages: ['Lab.6.html'] },
  '7': { spec: 'cypress/e2e/lab7.cy.js', pages: ['Lab.7.html'] },
};

// ─── Simple static file server ───────────────────────────────────────────────
let server = null;

function startServer() {
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      let filePath = path.join(LABS_DIR, decodeURIComponent(req.url === '/' ? '/index.html' : req.url));

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found: ' + req.url);
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mime = {
          '.html': 'text/html; charset=utf-8',
          '.css':  'text/css',
          '.js':   'application/javascript',
          '.png':  'image/png',
          '.jpg':  'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif':  'image/gif',
          '.svg':  'image/svg+xml',
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`\n✅  Server running at http://localhost:${PORT}\n`);
      resolve();
    });
    server.on('error', reject);
  });
}

function stopServer() {
  if (server) {
    server.close();
    server = null;
    console.log('🛑  Server stopped.\n');
  }
}

// ─── Cypress runner ──────────────────────────────────────────────────────────
function runCypress(spec, mode) {
  const args = mode === 'open'
    ? ['cypress', 'open', '--spec', spec]
    : ['cypress', 'run',  '--spec', spec, '--headed'];

  console.log(`\n🚀  Running: npx ${args.join(' ')}\n`);

  const proc = spawn('npx', args, { stdio: 'inherit', shell: true });
  proc.on('close', (code) => {
    console.log(`\n✔  Cypress exited with code ${code}`);
    promptMenu();
  });
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function question(text) {
  return new Promise((resolve) => rl.question(text, resolve));
}

async function promptMenu() {
  console.log('─────────────────────────────────────────');
  console.log('  🧪  Cypress Lab Runner');
  console.log('─────────────────────────────────────────');
  console.log('  1  →  Lab 1 (Tags)');
  console.log('  3  →  Lab 3 (Tables)');
  console.log('  4  →  Lab 4 (Image Maps)');
  console.log('  5  →  Lab 5 (Forms)');
  console.log('  6  →  Lab 6 (CSS Styles)');
  console.log('  7  →  Lab 7 (JavaScript)');
  console.log('  q  →  Quit');
  console.log('─────────────────────────────────────────');

  const choice = (await question('Enter lab number: ')).trim().toLowerCase();

  if (choice === 'q') {
    stopServer();
    rl.close();
    process.exit(0);
  }

  const lab = LAB_MAP[choice];
  if (!lab) {
    console.log('❌  Unknown choice, try again.\n');
    return promptMenu();
  }

  const mode = (await question('Run mode — (o)pen GUI / (r)un headless [o/r]: ')).trim().toLowerCase();
  const runMode = mode === 'r' ? 'run' : 'open';

  runCypress(lab.spec, runMode);
}

// ─── Entry point ─────────────────────────────────────────────────────────────
(async () => {
  try {
    await startServer();
    await promptMenu();
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
