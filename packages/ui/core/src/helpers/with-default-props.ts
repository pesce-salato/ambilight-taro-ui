export const withDefaultProps = <ECP extends Partial<DP>, DP extends object>(
  props: ECP,
) => {
  return props as unknown as Omit<ECP, keyof DP> & Required<Pick<ECP, keyof DP>>
}
