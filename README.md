# @ambilight-taro

## intro

这世上哪有那么多理由，想做便做了

希望它是一个开箱即用，且并不需要**过多修改样式**，本身足够优雅且完善的组件库

---

欢迎入门小白、没有经验的朋友们一起建设，希望能够让你们有所收获

欢迎老鸟、大神们多提 issue、pr，希望 **ambilight** 能够作为一个真正的开源项目存在

## commands

### dependency

use npm workspace

#### add to scope

```shell
npm install node-sass -w @ambilight-taro/rollup-plugin-ignore
```

### create package

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
npx lerna run build --scope=@ambilight-taro/button
```

```shell
# include dependencies
npx lerna run build --scope=@ambilight-taro/button --include-dependencies
```

```shell
# watch mode
npx lerna run build:watch --scope=@ambilight-taro/button --include-dependencies
```
