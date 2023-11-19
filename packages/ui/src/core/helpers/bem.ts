import { Abbr } from '../setting'

export class Bem {
  private cache = {
    namespace: '',
    hierarchies: [] as string[],
    status: '',
  }
  /**
   * 最大层级数目，默认为2
   */
  private static MaxHierarchiesNum = 2
  /**
   * className 辅助计算类
   * @param namespace 命名域，必填
   * @param hierarchies 层级，选填，受最大层级限制，默认为空数组
   * @param status 状态，选填，默认为空
   */
  constructor(
    namespace: string,
    hierarchies: string[] = [],
    status: string = '',
  ) {
    this.cache.namespace = namespace
    this.cache.hierarchies = hierarchies
    this.cache.status = status
    // 检查层级数目是否符合要求
    this.checkHierarchiesValid()
  }

  /**
   * 根据当前对象数据，增添新的层级，并且生成对象
   * @param add 添加层级
   */
  public hierarchies = (add: string[] | string) => {
    return new Bem(
      this.cache.namespace,
      [...this.cache.hierarchies, ...(typeof add === 'string' ? [add] : add)],
      this.cache.status,
    )
  }

  /**
   * 根据当前对象数据，改变状态，并且生成对象
   * @param newStatus 新的状态
   */
  public status = (newStatus: string) => {
    return new Bem(this.cache.namespace, [...this.cache.hierarchies], newStatus)
  }

  /**
   * 获取计算之后的className
   */
  public get className() {
    // 检查层级数目是否符合要求
    this.checkHierarchiesValid()
    // 添加统一组件库前缀
    return `${[
      `${Abbr}-${this.cache.namespace}`,
      ...this.cache.hierarchies,
    ].join('__')}${this.cache.status && '--' + this.cache.status}`
  }

  /**
   * 检查层级是否符合要求
   */
  private checkHierarchiesValid = () => {
    if (this.cache.hierarchies.length > Bem.MaxHierarchiesNum) {
      console.warn(
        `Hierarchies number should be <= Bem.MAX_HIERARCHIES_NUMBER(Now is set to ${Bem.MaxHierarchiesNum})`,
      )
    }
  }

  /**
   * 设置全局最大层级数目，将会影响所有BemHelper对象（请在使用对象之前就设置好，并且请勿随意更改）
   * @param maxNumber 最大数目
   */
  public static setMaxHierarchiesNumber = (maxNumber: number) => {
    Bem.MaxHierarchiesNum = maxNumber
  }
}
