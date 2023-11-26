import { generateBaseUiConfig } from '@ambilight-taro/rollup-config'
import copy from 'rollup-plugin-copy'

const config = generateBaseUiConfig()

config.plugins.push(
  copy({
    targets: [{ src: 'src/assets/**/*', dest: 'lib/assets' }],
  }),
)

export default config
