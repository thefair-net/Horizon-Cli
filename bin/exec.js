#!/usr/bin/env node
const path = require('path')
const inquirer = require('inquirer');
const cmdify = require('cmdify');
const {spawn, exec} = require('child_process');
const BottomBar = require('inquirer/lib/ui/bottom-bar')
const loader = ['🔍 Prepare to initialize.', '🔍 Prepare to initialize..', '🔍 Prepare to initialize...', '🔍 Prepare to initialize'];

const {
  HELP,
  UPDATE,
  WELCOME,
  WARN,
  SUCCESS,
  LOGO,
  COMING_SOON,
  LOADING,
  COPING,
  COPIED,
  INSTALLING,
  INSTALLED
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
    type: 'confirm',
    name: 'continue',
    message: '是否继续？',
    default: true,
  },
  {
    type: 'list',
    name: 'project_type',
    message: '请选择要将Horizon UI用于哪种项目',
    choices: ['H5', 'uni-app'],
    when: answer => {
      return answer.continue === true
    }
  },
  {
    type: 'list',
    name: 'css_unit',
    message: '请选择项目中使用的css单位',
    choices: ['px', 'rem', 'rpx'],
    when: answer => {
      return answer.continue === true
    }
  },
  {
    type: 'list',
    name: 'import_type',
    message: '请选择Horizon UI的引入方式',
    choices: ['按需引入（推荐）', '完整引入'],
    when: answer => {
      return answer.continue === true
    }
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

/**创建路径**/
function mkdir(dir) {
  return new Promise(resolve => {
    spawn('mkdir', [dir], {stdio: 'inherit'}).on('close', () => {
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

/**安装px2rex/px2rpx、拷贝postcss.config.js**/
function installPostcss(packageName) {
  return new Promise(async resolve => {
    const sourcePath = path.join(__dirname, `../template/${packageName}/postcss.config.js`)
    const targetPath = `${await getUsersProjectPath()}/postcss.config.js`
    console.log(INSTALLING(packageName))
    spawn(cmdify('yarn'), ['add', packageName, '-D'], {
      stdio: 'inherit'
    }).on('close', async code => {
      if (code === 0) {
        console.log(INSTALLED(packageName))
        console.log(COPING('postcss.config.js'))
        await copyFile(sourcePath, targetPath)
        console.log(COPIED('postcss.config.js'))
        resolve()
      }
    })
  })
}

/**安装babel-plugin-component、拷贝.babelrc**/
function installBabelPluginComponent() {
  return new Promise(async resolve => {
    const sourcePath = path.join(__dirname, `../template/.babelrc`)
    const targetPath = `${await getUsersProjectPath()}/.babelrc`
    console.log(INSTALLING('babel-plugin-component'))
    spawn(cmdify('yarn'), ['add', 'babel-plugin-component', '-D'], {
      stdio: 'inherit'
    }).on('close', async code => {
      if (code === 0) {
        console.log(INSTALLED('babel-plugin-component'))
        console.log(COPING('.babelrc'))
        await copyFile(sourcePath, targetPath)
        console.log(COPIED('.babelrc'))
        resolve()
      }
    })
  })
}

/**拷贝main.js**/
function copyMainJs(import_type) {
  return new Promise(async resolve => {
    console.log(COPING('main.js'))
    const sourcePath = path.join(__dirname, `../template/${import_type}/h5/main.js`)
    await mkdir('src')
    const targetPath = `${await getUsersProjectPath()}/src/main.js`
    await copyFile(sourcePath, targetPath)
    console.log(COPIED('main.js'))
    resolve()
  })
}

/**安装依赖**/
function installNodeModules(packageName) {
  return new Promise(resolve => {
    console.log(INSTALLING(packageName))
    spawn(cmdify('yarn'), ['add', packageName, '-D'], {
      stdio: 'inherit'
    }).on('close', code => {
      if (code === 0) {
        console.log(INSTALLED(packageName))
        resolve()
      }
    })
  })
}

/**安装Horizon UI组件库**/
function installComponentsLibrary(project_type) {
  // todo 目标项目类型安装不同组件库
  return new Promise(resolve => {
    console.log(INSTALLING('horizon-ui'))
    spawn(cmdify('yarn'), ['add', 'horizon-ui'], {
      stdio: 'inherit'
    }).on('close', code => {
      if (code === 0) {
        console.log(INSTALLED('horizon-ui'))
        resolve()
      }
    })
  })
}

/**安装前准备：查询是否需要升级CLI**/
async function prepareInit() {
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
  console.log(WARN)
}

/**执行操作**/
async function execute(argv) {
  switch (argv[0]) {
    case 'init':
      await prepareInit()
      const answers = await inquirer.prompt(questions)
      if (answers.continue === false) return
      // todo
      if (answers.project_type === 'uni-app') {
        console.log(COMING_SOON)
        return
      }
      // todo end
      console.log(LOADING)
      /**安装组件库**/
      await installComponentsLibrary(answers.project_type)
      /**安装依赖**/
      await installNodeModules('node-sass')
      await installNodeModules('sass-loader')
      /**安装postcss**/
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
      /**安装babel-plugin-component**/
      switch (answers.import_type) {
        case '按需引入（推荐）':
          await installBabelPluginComponent()
          await copyMainJs('import-on-demand')
          break
        case '完整引入':
          await copyMainJs('import-completely')
          break
      }
      console.log(SUCCESS)
      console.log(LOGO)
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
