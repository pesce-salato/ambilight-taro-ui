module.exports = {
  // 引入标准配置文件和scss配置扩展
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  plugins: ['stylelint-scss'],
  ignoreFiles: ['./**/*.js', './**/*.ts', './**/*.css', './node_modules/**/*'],
  rules: {
    // 最大嵌套层级5层
    'max-nesting-depth': [5],
    // 不检查缩进尺寸
    indentation: null,
    // 引号必须为单引号
    'string-quotes': ['single'],
    // 冒号后要加空格
    'declaration-colon-space-after': ['always'],
    // 冒号前不加空格
    'declaration-colon-space-before': ['never'],
    // 禁用类名声明必须空一行
    'declaration-empty-line-before': [null],
    // 属性单独成行
    'declaration-block-single-line-max-declarations': [1],
    // 不能使用颜色名定义颜色，只能使用HEX、rgab或hsl格式
    'color-named': ['never'],
    // url值必须使用单引号包裹
    'function-url-quotes': ['always'],
    // 不要使用@while
    'at-rule-disallowed-list': ['while'],
    // 多选择器必须单独成行，逗号结尾
    'selector-list-comma-newline-after': ['always'],
    // 不能有无效的16进制颜色值
    'color-no-invalid-hex': [true],
    // 关闭色值大小写校验
    'color-hex-case': [null],
    'declaration-colon-newline-after': [null],
    // 允许使用rpx作为单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page', 'taro-button-core'] }],
    'property-no-unknown': [true, { ignoreProperties: ['box-orient'] }],
    // 末尾不需要多的行数
    'no-missing-end-of-source-newline': [null],
    // property 保留厂商前缀
    'property-no-vendor-prefix': [null],
    // value 保留厂商前缀
    'value-no-vendor-prefix': [null],
    // 不处理注释位置
    'comment-empty-line-before': [null],
    // 关闭对于伪选择器的:个数校验
    'selector-pseudo-element-colon-notation': [null],
    // 允许存在规则为空
    'rule-empty-line-before': [null],
    // 大小写单位都允许 EM: PX
    'unit-case': [null],
    // 组合选择器前后不需要空格
    'selector-combinator-space-before': [null],
    'selector-combinator-space-after': [null],
    'color-hex-length': [null],
    'no-eol-whitespace': [null],
    'import-notation': ['string'],
    'scss/at-import-partial-extension': [null]
  }
}
