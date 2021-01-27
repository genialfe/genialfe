import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 查询用户已选择的下周空闲时间
 */
export function getAvailableTimes() {
  return fetch(`${API_PREFIX}/mtg/weekly`, {
    method: 'GET'
  })
}

/**
 * 查询用户当月已匹配完成的会议
 */
export function getMatchesMonthly() {
  return fetch(`${API_PREFIX}/mtg/monthly`, {
    method: 'GET'
  })
}
