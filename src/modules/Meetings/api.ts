import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 查询用户已选择的下周空闲时间 以及用户状态 包括是否跳过下周等
 */
export function getAvailableTimesAndMatchStatus() {
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

/**
 * 通过matchId查询视频会议的token 会议channel就是matchId
 */
export function enterMeeting(matchId: string) {
  return fetch(`${API_PREFIX}/mtg/join?matchId=${matchId}`, {
    method: 'POST'
  })
}

/**
 * 通过matchId查询对方信息
 */
export function getMatchDetail(matchId: string) {
  return fetch(`${API_PREFIX}/mtg/partner?matchId=${matchId}`, {
    method: 'GET'
  })
}

/**
 * 通过matchId结束会议
 */
export function endMeeting(matchId: string) {
  return fetch(`${API_PREFIX}/mtg/end?matchId=${matchId}`, {
    method: 'POST'
  })
}
