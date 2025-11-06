// Config de debug visual para áreas dos layouts
const debugMode = true

export const debugColor = {
  red: debugMode ? 'red.300' : 'transparent',
  redDark: debugMode ? 'red.700' : 'transparent',
  blue: debugMode ? 'blue.200' : 'transparent',
  blueDark: debugMode ? 'blue.700' : 'transparent',
  green: debugMode ? 'green.300' : 'transparent',
  greenDark: debugMode ? 'green.700' : 'transparent',
  yellow: debugMode ? 'yellow.300' : 'transparent',
  yellowDark: debugMode ? 'yellow.700' : 'transparent',
  gray: debugMode ? 'gray.300' : 'transparent',
  grayDark: debugMode ? 'gray.700' : 'transparent',
  orange: debugMode ? 'orange.300' : 'transparent',
  orangeDark: debugMode ? 'orange.700' : 'transparent',
  purple: debugMode ? 'purple.300' : 'transparent',
  purpleDark: debugMode ? 'purple.700' : 'transparent',
  pink: debugMode ? 'pink.300' : 'transparent',
  pinkDark: debugMode ? 'pink.700' : 'transparent',
  brown: debugMode ? 'brown.300' : 'transparent',
  brownDark: debugMode ? 'brown.700' : 'transparent',
  cyan: debugMode ? 'cyan.300' : 'transparent',
  cyanDark: debugMode ? 'cyan.700' : 'transparent',
  teal: debugMode ? 'teal.300' : 'transparent',
  tealDark: debugMode ? 'teal.700' : 'transparent',
  indigo: debugMode ? 'indigo.300' : 'transparent',
  indigoDark: debugMode ? 'indigo.700' : 'transparent',
  violet: debugMode ? 'violet.300' : 'transparent',
  violetDark: debugMode ? 'violet.700' : 'transparent',

  black: debugMode ? 'black' : 'transparent',
  white: debugMode ? 'white' : 'transparent',
  transparent: 'transparent',
}

export const debug = {
  header: debugMode ? 'green.200' : 'transparent',
  main: debugMode ? 'yellow.300' : 'transparent',
  content: debugMode ? 'gray.500' : 'transparent',
  pageContent: debugMode ? 'gray.200' : 'transparent',
  footer: debugMode ? 'purple.300' : 'transparent',
  sidebar: debugMode ? 'gray.300' : 'transparent',
  color: debugColor,
}


