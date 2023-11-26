import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { ClearPlugin } from '@ambilight-taro/rollup-plugin-clear'

export default {
  external: ['rollup'],
  input: './src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      strict: false,
      preserveModules: true,
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    ClearPlugin(['lib'])
  ],
}
