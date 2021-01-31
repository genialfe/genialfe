import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 生成邀请码
 */
export function generateInvitationCode() {
  return fetch(`${API_PREFIX}/ops/invitation`, {
    method: 'POST'
  })
}

/**
 * 获取验证码及验证码状态
 */
export function getInvitationCode() {
  return fetch(`${API_PREFIX}/ops/invitation`, {
    method: 'GET'
  })
}
