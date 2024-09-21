# @ambilight-taro

## intro

Inspired by [chakra](https://v2.chakra-ui.com/docs/components/button/usage), but limited by mini program and simplicity, only `colorSchema` props is implemented(😢).

All theme atomic is implemented by css variables, that means you can design your own theme and easy to replace the default.

## commands

### dependency

use npm workspace

#### add to scope

```shell
npm install node-sass -w @ambilight-taro/rollup-plugin-ignore
```

### create

```shell
npm run create
```

### build

#### all

```shell
npx lerna run build --stream
```

#### scope

```shell
npx lerna run build --scope=@ambilight-taro/button --include-dependencies
```
