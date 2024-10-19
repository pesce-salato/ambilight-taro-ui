export enum Color {
  white = 'white',
  black = 'black',
  gray = 'gray',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  green = 'green',
  teal = 'teal',
  blue = 'blue',
  cyan = 'cyan',
  purple = 'purple',
  pink = 'pink',
}

export interface WithThemeProps {
  colorScheme?: Color
}
