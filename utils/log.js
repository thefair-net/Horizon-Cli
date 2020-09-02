const chalk = require('chalk')
const updateTitle = (current, latest) => `${chalk.reset('New version available')} ${chalk.magenta(current)} ${chalk.reset('→')} ${chalk.yellowBright(latest)}`
const updateSubtitle = `${chalk.reset('Run')} ${chalk.yellow('yarn global add horizon-ui-cli')} ${chalk.reset('to update!')}${chalk.yellowBright(' ')}`

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
const LOADING = chalk.reset(
  '⚙️  Installing Horizon UI. This might take a while...'
)
const COPIED = chalk.green(
  `success ${chalk.reset(`postcss.config.js has been copied`)}`
)
module.exports = {
  UPDATE,
  WELCOME,
  SUCCESS,
  COMING_SOON,
  LOADING,
  COPIED
}
