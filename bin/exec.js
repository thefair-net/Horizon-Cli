#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer');
const cmdify = require('cmdify');
const {spawn, exec} = require('child_process');
const BottomBar = require('inquirer/lib/ui/bottom-bar')
const loader = ['🔍 Prepare to initialize.', '🔍 Prepare to initialize..', '🔍 Prepare to initialize...', '🔍 Prepare to initialize'];

const {
  HELP,
  UPDATE,
  WELCOME,
  SUCCESS,
  COMING_SOON,
  LOADING,
  COPIED
} = require('../utils/log')
const {
  copyFile
} = require('../utils/copy')

const current_version = require('../package.json').version
let latest_version = ''

function getLatestVersion() {
  return new Promise(resolve => {
    exec('npm view horizon-ui-cli version').stdout.on('data', data => {
      latest_version = data.replace(/[\r\n]/g, "");
      resolve()
    })
  })
}

/**用户选择列表**/
const questions = [
  {
    type: 'list',
    name: 'project_type',
    message: '请选择要将Horizon UI用于哪种项目',
    choices: ['H5', 'uni-app'],
  },
  {
    type: 'list',
    name: 'css_unit',
    message: '请选择项目中使用的css单位',
    choices: ['px', 'rem', 'rpx'],
  },
];

/**清空命令行**/
function clearTerminal() {
  return new Promise(resolve => {
    spawn('clear', [], {stdio: 'inherit'}).on('close', () => {
      resolve()
    })
  })
}

/**获取用户项目所在路径**/
function getUsersProjectPath() {
  return new Promise(resolve => {
    exec('pwd').stdout.on('data', data => {
      resolve(data.replace(/[\r\n]/g, ""))
    })
  })
}

/**拷贝postcss.config.js、安装px2rex/px2rpx、postcss**/
function installPostcss(packageName) {
  return new Promise(async resolve => {
    const sourcePath = path.join(__dirname, `../template/${packageName}/postcss.config.js`)
    const targetPath = `${await getUsersProjectPath()}/postcss.config.js`
    await copyFile(sourcePath, targetPath)
    console.log(COPIED)
    spawn(cmdify('yarn'), ['add', packageName, 'postcss', '-D'], {
      stdio: 'inherit'
    }).on('close', code => {
      code === 0 && resolve()
    })
  })
}

/**安装Horizon UI组件库**/
function installComponentsLibrary() {
  return new Promise(resolve => {
    spawn(cmdify('yarn'), ['add', 'horizon-ui'], {
      stdio: 'inherit'
    }).on('close', code => {
      code === 0 && resolve()
    })
  })
}

/**安装前准备：查询是否需要升级CLI**/
function prepareInit() {
  return new Promise(async resolve => {
    let i = 4;
    const ui = new BottomBar({bottomBar: loader[i % 4]});
    const timer = setInterval(() => {
      ui.updateBottomBar(loader[i++ % 4]);
    }, 200);
    await getLatestVersion()
    clearInterval(timer)
    ui.updateBottomBar('');
    await clearTerminal()
    if (latest_version !== current_version) {
      console.log(UPDATE(current_version, latest_version))
    } else {
      console.log(WELCOME(current_version))
    }
    resolve()
  })
}

/**执行操作**/
async function execute(argv) {
  switch (argv[0]) {
    case 'init':
      await prepareInit()
      const answers = await inquirer.prompt(questions)
      // todo
      if (answers.project_type === 'uni-app') {
        console.log(COMING_SOON)
        return
      }
      // todo end
      console.log(LOADING)
      switch (answers.css_unit) {
        case 'rem':
          await installPostcss('postcss-px2rem')
          break
        case 'rpx':
          await installPostcss('postcss-px2rpx')
          break
        case 'px':
          break
      }
      await installComponentsLibrary(answers.project_type)
      console.log(SUCCESS)
      break
    case '-v':
    case '--version':
      console.log(require('../package.json').version)
      break
    case '-l':
    case '--latest':
      await getLatestVersion()
      console.log(latest_version)
      break
    case '-h':
    case '--help':
    default:
      await clearTerminal()
      console.log(HELP)
  }
}

execute(process.argv.slice(2));
