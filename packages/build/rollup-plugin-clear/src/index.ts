import { type Plugin } from 'rollup'
import { rimrafSync } from 'rimraf'
import Path from 'node:path'

export const ClearPlugin = (clearDirectories: string[]): Plugin => {
  return {
    name: '@ambilight-taro/rollup-plugin-clear',
    buildStart() {
      for (const directory of clearDirectories) {
        rimrafSync(Path.join(process.cwd(), directory))
      }
    },
  }
}
