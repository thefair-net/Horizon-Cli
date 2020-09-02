#!/usr/bin/env node
const chalk = require('chalk')
const inquirer = require('inquirer');
const cmdify = require('cmdify');
const {spawn, exec} = require('child_process');
const {
  UPDATE,
  WELCOME,
  SUCCESS,
  COMING_SOON,
  LOADING
} = require('./log')
const current_version = require('./package.json').version
let latest_version = ''
const get_latest_version = (callback) => {
  exec('npm view horizon-ui-cli version').stdout.on('data', data => {
    latest_version = data.replace(/[\r\n]/g, "");
    callback && callback()
  })
}

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

function installRemH5() {
  console.log(LOADING)
  spawn(cmdify('yarn'), ['add', 'horizon-ui'], {
    stdio: 'inherit'
  }).on('close', code => {
    code === 0 && console.log(SUCCESS)
  })
}

function prepareInit() {
  return new Promise(resolve => {
    get_latest_version(() => {
      if (latest_version !== current_version) {
        console.log(UPDATE(current_version, latest_version))
        resolve()
      } else {
        console.log(WELCOME(current_version))
        resolve()
      }
    })
  })
}

async function execute(argv) {
  switch (argv[0]) {
    case 'init':
      await prepareInit()
      inquirer.prompt(questions).then((answers) => {
        switch (answers.target) {
          case 'H5':
            switch (answers.css_unit) {
              case 'rem':
                installRemH5()
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
    case '-v':
    case '--version':
      console.log(require('./package.json').version)
      break
    case '--latest':
      get_latest_version(() => {
        console.log(latest_version)
      })
      break
    default:
      console.log(chalk.red('error'), chalk.blue('缺少参数'), chalk.yellow('[init]'), chalk.blue('或参数有误，请重试'))
  }
}

execute(process.argv.slice(2));
