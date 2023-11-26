# @ambilight-taro


## dependency

use npm workspace

### add to scope

```shell
npm install node-sass -w @ambilight-taro/rollup-plugin-separate-scss
```

## build

### all

```shell
npx lerna run build --stream
```

### scope

```shell
npx lerna run build --scope=@ambilight-taro/button --include-dependencies
```
