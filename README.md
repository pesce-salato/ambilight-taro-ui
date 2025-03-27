# @ambilight-taro

## Intro

这世上哪有那么多理由，想做便做了

欢迎入门小白、没有经验的朋友们一起建设，希望能够让你们有所收获

欢迎大佬们多提 issue、pr，希望 **ambilight** 能够作为一个真正的能够帮助大家节省时间的开源项目存在

希望它是一个开箱即用，尽可能简单且并不需要**过多修改样式**，本身足够优雅且完善的组件库

> ambilight 是一个普普通通的 mono 组件库，也没有什么独特的、跨时代的东西，毕竟都 2024 年了，体系、技术栈都已十分成熟
> 
> 它是作者业余时间积累下来打 “螺丝” 时用得顺手一些的 “螺丝刀”
>
> 由于时间原因，当前只对微信进行了测试，但代码中并无太多特殊处理，故而只需要做少量兼容即可
>
> For WLB!
>
> Cuckoo 2024.02.01 碎碎念

## Demo

### Wechat

<img src="https://cdn.salted-fish.org/ambilight-taro/demo/qr-wechat.png" width="200" height="200" />


## Commands

### Dependency

use npm workspace

#### Add to scope

```shell
npm install node-sass -w @ambilight-taro/rollup-plugin-ignore
```

### Create package

```shell
npm run create
```

### Build

#### All

```shell
npx lerna run build --stream
```

#### Scope

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
