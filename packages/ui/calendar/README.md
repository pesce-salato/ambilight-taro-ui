## 日期信息获取器

支持逐步渲染，逐级丰富，传递 update 函数

避免出现一堆无用的值为 Undefined key，在 set 的时候做一下查询，过滤掉无用的 undefined 设置更新

## 日期渲染器

## 假日、节日信息

### 中国

支持预加载 json 信息

就算是预设也要最大程度支持自定义

#### 假日/补班信息

TODO: 拆出来新的组件？？

中国假日信息来源于每年国务院文件发布（故而明年的文件不发布之前无法得知），组件提供对于中国假日的预设支持

> - 数据来源： https://github.com/NateScarlet/holiday-cn
> - 数据 cdn（在此感谢赛博活菩萨 cloudflare）
>   - template: https://cdn.salted-fish.org/ambilight-taro/holiday-cn/{year}.json
>   - 🌰：https://cdn.salted-fish.org/ambilight-taro/holiday-cn/2025.json

### 自定义
