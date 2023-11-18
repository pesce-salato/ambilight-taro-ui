import Inquirer from 'inquirer'
import { log, withIcon } from '../console.js'

const GroupMap = {
  hook: 'hook',
  ui: 'ui',
}

const PackageGroupPrefix = '@ambilight-taro'

const TargetDirectory = {
  [GroupMap.ui]: './packages/ui',
  [GroupMap.hook]: './packages/hook',
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
    console.log('\n' + withIcon(`create dir ${log(createDirectory)}`))

    console.log(withIcon('copy template files'))
  }
})()
