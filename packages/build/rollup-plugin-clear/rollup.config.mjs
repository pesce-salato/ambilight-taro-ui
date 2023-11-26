import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  external: ['rollup', 'rimraf'],
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
  ],
}
