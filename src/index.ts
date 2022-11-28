import { doPost, main } from './main'

declare const global: {
  [x: string]: unknown
}

global.doPost = doPost
global.main = main
