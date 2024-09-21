# @ambilight-taro

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
