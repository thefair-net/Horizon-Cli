const chalk = require('chalk')
const updateTitle = (current, latest) => `${chalk.reset('New version available')} ${chalk.magenta(current)} ${chalk.reset('→')} ${chalk.yellowBright(latest)}`
const updateSubtitle = `${chalk.reset('Run')} ${chalk.yellow('yarn global add horizon-ui-cli')} ${chalk.reset('to update!')}${chalk.yellowBright(' ')}`

const HELP = chalk.bold(
  chalk.blue('\nHorizon UI CLI 使用方法\n\n') +
  'Usage: horizon <command> [option]\n' +
  '\n' +
  '选项[option]:\n' +
  '  -v, --version                         CLI 当前版本\n' +
  '  -l, --latest                          CLI 最新版本\n' +
  '  -h, --help                            获取帮助信息\n' +
  '\n' +
  '操作<command>:\n' +
  '  init                                  为你的项目安装定制化的Horizon UI组件库，如自定义css单位、引入方式等。现已支持uni-app！\n'
)
const UPDATE = (current, latest) => chalk.yellowBright(
  '┌───────────────────────────────────────────────────┐\n' +
  '│                                                   │\n' +
  '│        ' + updateTitle(current, latest) + '        │\n' +
  '│   ' + updateSubtitle + '  │\n' +
  '│                                                   │\n' +
  '└───────────────────────────────────────────────────┘'
)
const welcomeTitle = `${chalk.reset('Welcome to')} ${chalk.yellow('Horizon UI CLI')}`
const welcomeSubtitle = current => `${chalk.reset('version')} ${chalk.magenta(current)}${chalk.blue(' ')}`

const WELCOME = current => chalk.blue(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│          ' + welcomeTitle + '          │\n' +
  '│                ' + welcomeSubtitle(current) + '               │\n' +
  '│                                             │\n' +
  '└─────────────────────────────────────────────┘\n'
)
const WARN = chalk.bgYellow.rgb(255, 255, 255)(' WARN ' + chalk.reset.yellow(' 该操作可能会对项目造成破坏，请确保没有未被 commit 或 stash 的变更。'))
const SUCCESS = chalk.green(
  '┌─────────────────────────────┐\n' +
  '│ ✨ Installed Successfully! ✨ │\n' +
  '└─────────────────────────────┘\n'
)
const LOGO = (
  `
  ${chalk.red('██╗  ██╗')}${chalk.yellow(' ██████╗ ')}${chalk.green('██████╗ ')}${chalk.blue('██╗')}${chalk.magenta('███████╗')}${chalk.cyan(' ██████╗ ')}${chalk.red('███╗   ██╗')}    ${chalk.yellow('██╗   ██╗')}${chalk.green('██╗')}
  ${chalk.red('██║  ██║')}${chalk.yellow('██╔═══██╗')}${chalk.green('██╔══██╗')}${chalk.blue('██║')}${chalk.magenta('╚══███╔╝')}${chalk.cyan('██╔═══██╗')}${chalk.red('████╗  ██║')}    ${chalk.yellow('██║   ██║')}${chalk.green('██║')}
  ${chalk.red('███████║')}${chalk.yellow('██║   ██║')}${chalk.green('██████╔╝')}${chalk.blue('██║')}${chalk.magenta('  ███╔╝ ')}${chalk.cyan('██║   ██║')}${chalk.red('██╔██╗ ██║')}    ${chalk.yellow('██║   ██║')}${chalk.green('██║')}
  ${chalk.red('██╔══██║')}${chalk.yellow('██║   ██║')}${chalk.green('██╔══██╗')}${chalk.blue('██║')}${chalk.magenta(' ███╔╝  ')}${chalk.cyan('██║   ██║')}${chalk.red('██║╚██╗██║')}    ${chalk.yellow('██║   ██║')}${chalk.green('██║')}
  ${chalk.red('██║  ██║')}${chalk.yellow('╚██████╔╝')}${chalk.green('██║  ██║')}${chalk.blue('██║')}${chalk.magenta('███████╗')}${chalk.cyan('╚██████╔╝')}${chalk.red('██║ ╚████║')}    ${chalk.yellow('╚██████╔╝')}${chalk.green('██║')}
  ${chalk.red('╚═╝  ╚═╝')}${chalk.yellow(' ╚═════╝ ')}${chalk.green('╚═╝  ╚═╝')}${chalk.blue('╚═╝')}${chalk.magenta('╚══════╝')}${chalk.cyan(' ╚═════╝ ')}${chalk.red('╚═╝  ╚═══╝')}    ${chalk.yellow(' ╚═════╝ ')}${chalk.green('╚═╝')}
  `
)
const COMING_SOON = chalk.yellow(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│               Coming Soon...                │\n' +
  '│                                             │\n' +
  '└─────────────────────────────────────────────┘\n'
)
const LOADING = chalk.reset(
  '⚙️  Installing Horizon UI. This might take a while...'
)
const COPING = filename => chalk.blue(
  `info ${chalk.reset(`${filename} 开始拷贝...`)}`
)
const COPIED = filename => chalk.green(
  `success ${chalk.reset(`${filename} 拷贝成功！`)}`
)
const INSTALLING = packageName => chalk.blue(
  `info ${chalk.reset(`${packageName} 开始安装...`)}`
)
const INSTALLED = packageName => chalk.green(
  `success ${chalk.reset(`${packageName} 安装成功！`)}`
)
module.exports = {
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
}
