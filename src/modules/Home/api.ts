import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 获取推荐用户列表
 */
export function getRecommendUserlist() {
  return fetch(`${API_PREFIX}/home/recommend`, {
    method: 'GET'
  })
}

/**
 * 获取匹配用户列表
 */
export function getMatchedUserlist() {
  return fetch(`${API_PREFIX}/home/match`, {
    method: 'GET'
  })
}
