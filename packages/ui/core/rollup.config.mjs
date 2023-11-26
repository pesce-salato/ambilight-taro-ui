import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-import-css'
import Fs from 'node:fs'
import Path from 'node:path'

const Package = JSON.parse(Fs.readFileSync('./package.json').toString())

export default {
  external: [
    'react',
    '@tarojs/taro',
    ...Object.keys(Package.dependencies || {}),
    ...Object.keys(Package.devDependencies || {}),
  ],
  input: './src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'es',
      strict: false,
      preserveModules: true,
    }
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extract: Path.resolve('./lib/theme.css'),
    }),
    nodeResolve(),
    commonjs(),
    css()
  ],
}
