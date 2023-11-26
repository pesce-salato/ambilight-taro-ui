import { type Plugin } from 'rollup'
import nodeSass, { type Options, type Result } from 'node-sass'
import Path from 'node:path'

const NodeSassPromise = (options: Options) => {
  return new Promise<Result>((resolve, reject) => {
    nodeSass.render(options, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

export const SeparateScssPlugin = (): Plugin => {
  const Prefix = '@ambilight-taro/rollup-plugin-separate-scss/temp/'

  return {
    name: '@ambilight-taro/rollup-plugin-separate-scss',
    async resolveId(source: string) {
      // treat temp css import as external
      if (source.startsWith(Prefix)) {
        return false
      }

      // eslint-disable-next-line unicorn/no-null
      return null
    },
    async transform(_code, id: string) {
      if (id.endsWith('.scss')) {
        const {
          css,
          stats: { includedFiles },
        } = await NodeSassPromise({
          file: id,
        })

        // add scss dependency to watch file list
        for (const file of includedFiles) {
          this.addWatchFile(file)
        }

        const relative = Path.relative(
          Path.join(process.cwd(), 'src'),
          id,
        ).replace('.scss', '.css')

        // create match css file to target place
        this.emitFile({
          type: 'asset',
          fileName: relative,
          source: css.toString(),
        })

        // format css import statement with prefix
        return `import '${Prefix}${relative}';\n`
      }
    },
    renderChunk(code: string, { fileName }) {
      if (new RegExp(Prefix, 'g').test(code)) {
        // replace temp path with the relative path to importer file
        // eslint-disable-next-line unicorn/prefer-string-replace-all
        return code.replace(new RegExp(`${Prefix}[^"']+`, 'g'), (sub) => {
          // eslint-disable-next-line unicorn/prefer-string-replace-all
          const cssRelativeToRoot = sub.replace(new RegExp(Prefix, 'g'), '')

          let cssRelativeToImporter = Path.relative(
            Path.dirname(fileName),
            cssRelativeToRoot,
          )

          if (!cssRelativeToImporter.startsWith('../')) {
            cssRelativeToImporter = './' + cssRelativeToImporter
          }

          return cssRelativeToImporter
        })
      }
      // eslint-disable-next-line unicorn/no-null
      return null
    },
  }
}
