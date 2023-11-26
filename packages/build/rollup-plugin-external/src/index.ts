import { type InputOptions, type Plugin } from 'rollup'
import Path from 'node:path'
import Fs from 'node:fs'
import process from 'node:process'

export const ExternalPlugin = (config?: { includes?: string[] }): Plugin => {
  const { includes = [] } = config || {}

  return {
    name: '@ambilight-taro/rollup-plugin-external',
    options(options: InputOptions): InputOptions {
      const { external: optionExternal = [] } = options
      const { devDependencies = {}, dependencies = {} } = JSON.parse(
        Fs.readFileSync(Path.join(process.cwd(), 'package.json')).toString(),
      )

      const external = new Set([
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        ...(Array.isArray(optionExternal) ? optionExternal : [optionExternal]),
      ])

      for (const item of includes) external.delete(item)

      console.log(
        '\nIf you install new dependencies, please restart build, watch mode will not flush options',
      )
      console.log('external:', [...external.values()], '\n')

      return {
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        external: [...external.values()] as any,
      }
    },
  }
}
