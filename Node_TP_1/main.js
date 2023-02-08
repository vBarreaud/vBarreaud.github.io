const ProgressBar = require('progress');
const chalk = require('chalk');

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
	console.log(chalk.red('DONE!'));
	console.log(chalk.blue('DONE!'));
	console.log(chalk.green('DONE!'));
	console.log(chalk.yellow('DONE!'));
    clearInterval(timer);
  }
}, 100);