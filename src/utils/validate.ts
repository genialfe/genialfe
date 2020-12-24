export function isPhoneNumber(number: string) {
  const reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/
  return reg.test(number)
}