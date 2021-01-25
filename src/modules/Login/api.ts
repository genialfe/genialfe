import fetch from '../../utils/fetch'
import { API_PREFIX } from '../constants'

export interface ILoginParam {
  phone: string
  code: string
}

/**
 * 用户登录
 */
export function login(param: ILoginParam) {
  const {phone, code} = param
  return fetch(`${API_PREFIX}/user/login?phone=${phone}&code=${code}`, {
    method: 'POST'
  })
}