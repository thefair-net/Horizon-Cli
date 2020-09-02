const chalk = require('chalk')
const title = (current, latest) => `${chalk.reset('New version available')} ${chalk.magenta(current)} ${chalk.reset('→')} ${chalk.yellowBright(latest)}`
const subtitle = `${chalk.reset('Run')} ${chalk.yellow('yarn global add horizon-ui-cli')} ${chalk.reset('to update!')}${chalk.yellowBright(' ')}`

const UPDATE = (current, latest) => chalk.yellowBright(
  '┌───────────────────────────────────────────────────┐\n' +
  '│                                                   │\n' +
  '│        ' + title(current, latest) + '        │\n' +
  '│   ' + subtitle + '  │\n' +
  '│                                                   │\n' +
  '└───────────────────────────────────────────────────┘'
)
const WELCOME = current => chalk.blue(
  '┌─────────────────────────────────────────────┐\n' +
  '│                                             │\n' +
  '│          Welcome to Horizon UI CLI          │\n' +
  '│                version ' + current + '                │\n' +
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
const LOADING = chalk.rgb(200, 200, 200)(
  '\n⚙️  Installing Horizon UI. This might take a while...\n'
)
module.exports = {
  UPDATE,
  WELCOME,
  SUCCESS,
  COMING_SOON,
  LOADING
}
