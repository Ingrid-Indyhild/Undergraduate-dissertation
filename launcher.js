const { exec } = require('child_process');
const readline = require('readline');
const open = require('open');

console.log('Запуск локального сервера...\n');

const server = exec('npx http-server');

server.stdout.on('data', (data) => {
  if (data.includes('Available on')) {
    console.log('localhost успішно запущений: http://127.0.0.1:8080\n');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(
      'Бажаєте переглянути веб-роботу перед тестуванням? (y/n): ',
      async (answer) => {

        if (answer.toLowerCase() === 'y') {
          await open('http://127.0.0.1:8080');
        }

        console.log('\nЗапуск Cypress...');
        exec('npx cypress open');

        rl.close();
      }
    );
  }
});

server.stderr.on('data', (err) => {
  console.error(err);
});