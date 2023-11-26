import Chalk from 'chalk'

const Icon = '🌈'

const ColorMap = {
  blue: '#00BCD4',
  green: '#4CAF50',
  orange: '#ff6900',
  pink: '#E91E63',
}

export const withIcon = (text) => `${Icon} ${text}`

export const log = (text) => Chalk.hex(ColorMap.blue)(text)

export const warn = (text) => Chalk.hex(ColorMap.orange)(text)

export const error = (text) => Chalk.hex(ColorMap.pink)(text)

export const success = (text) => Chalk.hex(ColorMap.green)(text)
