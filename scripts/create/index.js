import Inquirer from 'inquirer'
import { commandSync } from 'execa'
import Fs from 'node:fs'
import Process from 'node:process'
import Path from 'node:path'
import { log, withIcon, success } from '../console.js'

const GroupMap = {
  hook: 'hook',
  ui: 'ui',
}

const PackageNamePlaceholder = '<<AL-PACKAGE-NAME>>'
const PackageGroupPrefix = '@ambilight-taro'

const TargetDirectory = {
  [GroupMap.ui]: './packages/ui',
  [GroupMap.hook]: './packages/hook',
}

const TemplateDirectory = {
  [GroupMap.ui]: Path.join(Process.cwd(), './scripts/create/templates/ui'),
  [GroupMap.hook]: Path.join(Process.cwd(), './scripts/create/templates/ui'),
}

await (async () => {
  const { group } = await Inquirer.prompt([
    {
      type: 'list',
      name: 'group',
      message: 'choose belong group',
      choices: Object.values(GroupMap),
    },
  ])

  const { packageName } = await Inquirer.prompt({
    type: 'input',
    name: 'packageName',
    message: 'input the package name:',
    validate: (name) => {
      if (group === GroupMap.hook && !/^use-.+/.test(name)) {
        return 'hook package should be named with format use-xxx'
      }

      return true
    },
  })

  const fullPackageName = `${PackageGroupPrefix}/${packageName}`
  const createDirectory = `${TargetDirectory[group]}/${packageName}`

  const { sure } = await Inquirer.prompt({
    type: 'confirm',
    name: 'sure',
    message: `sure to create package ${log(fullPackageName)} in ${log(
      createDirectory,
    )}?`,
    when: true,
  })

  if (sure) {
    console.log('\n' + withIcon(`${log('create')} dir ${log(createDirectory)}`))
    Fs.mkdirSync(createDirectory)

    console.log(withIcon(`${log('copy')} template files`))
    const templateDirectory = TemplateDirectory[group]
    commandSync(`npx cpy ${templateDirectory + '/**/*'} ${createDirectory}`)

    const packageFilePath = Path.join(createDirectory, 'package.json')
    Fs.writeFileSync(
      packageFilePath,
      Fs.readFileSync(packageFilePath)
        .toString()
        .replace(PackageNamePlaceholder, fullPackageName),
    )

    console.log(withIcon(log('npm i')))
    commandSync('npm i')

    console.log(withIcon(success('succeed')))
  }
})()
