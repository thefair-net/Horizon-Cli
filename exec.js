#!/usr/bin/env node
const chalk = require('chalk')
const inquirer = require('inquirer');
const cmdify = require('cmdify');
const {spawn, exec} = require('child_process');
const WELCOME = chalk.blue(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│          Welcome to Horizon UI CLI          │\n' +
  '│                                             │\n' +
  '└─────────────────────────────────────────────┘\n'
)
const SUCCESS = chalk.green(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│     Horizon UI Installed Successfully!      │\n' +
  '│                                             │\n' +
  '└─────────────────────────────────────────────┘\n'
)
const COMING_SOON = chalk.yellow(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│               Coming Soon...                │\n' +
  '│                                             │\n' +
  '└─────────────────────────────────────────────┘\n'
)
const LOADING = chalk.rgb(200,200,200)(
  '\n⚙️  Installing Horizon UI. This might take a while...\n'
)

var questions = [
  {
    type: 'list',
    name: 'target',
    message: '请选择要将Horizon UI用于哪种项目',
    choices: ['H5', 'uni-app'],
  },
  {
    type: 'list',
    name: 'css_unit',
    message: '请选择想要使用的css单位',
    choices: ['rem', 'px'],
    when: answer => {
      return answer.target === 'H5'
    }
  },
];

function execute(argv) {
  switch (argv[0]) {
    case 'init':
      console.log(WELCOME)
      inquirer.prompt(questions).then((answers) => {
        switch (answers.target) {
          case 'H5':
            switch (answers.css_unit) {
              case 'rem':
                // const cmd = 'yarn add horizon-ui'
                // const ls = exec(cmd, function(error, stdout, stderr) {
                //   console.log(error, stdout, stderr)
                // })
                // ls.stdout.on('data', data => {
                //   console.log('stdout')
                //   console.log(data)
                // })
                // ls.stderr.on('data', data => {
                //   console.log('stderr')
                //   console.log(data)
                // })
                // ls.on('close', code => {
                //   console.log('close')
                //   console.log(`child process exited with code ${code}`)
                // })
                console.log(LOADING)
                spawn(cmdify('yarn'), ['add', 'horizon-ui'], {
                  stdio: 'inherit'
                }).on('close', code => {
                  code === 0 && console.log(SUCCESS)
                })
                break
              case 'px':
                console.log(COMING_SOON)
                break
            }
            break
          case 'uni-app':
            console.log(COMING_SOON)
            break
        }
      });
      break
    default:
      console.log(chalk.red('error'), chalk.blue('缺少参数'), chalk.yellow('[init]'), chalk.blue('或参数有误，请重试'))
  }
}

execute(process.argv.slice(2));
