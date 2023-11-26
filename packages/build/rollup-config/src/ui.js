import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { SeparateScssPlugin } from '@ambilight-taro/rollup-plugin-separate-scss'
import { ClearPlugin } from '@ambilight-taro/rollup-plugin-clear'
import { ExternalPlugin } from '@ambilight-taro/rollup-plugin-external'

export const generateBaseUiConfig = () => ({
  input: './src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'es',
      strict: false,
      preserveModules: true,
    },
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    SeparateScssPlugin(),
    ClearPlugin(['lib']),
    ExternalPlugin(),
  ],
})
