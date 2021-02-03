import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 用户设置空闲时间
 */
export function setAvailableTimes(times: string) {
  return fetch(`${API_PREFIX}/mtg/sign?date=${times}`, {
    method: 'POST'
  })
}

/**
 * 跳过本周
 */
export function skipThisWeek(type: number) {
  return fetch(`${API_PREFIX}/mtg/pass?type=${type}`, {
    method: 'POST'
  })
}
