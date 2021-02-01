import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

/**
 * 生成邀请码
 */
export function generateInvitationCode() {
  return fetch(`${API_PREFIX}/ops/invitation`, {
    method: 'POST'
  })
}

/**
 * 获取邀请码及邀请码状态
 */
export function getInvitationCode() {
  return fetch(`${API_PREFIX}/ops/invitation`, {
    method: 'GET'
  })
}

/**
 * 获取用户信息
 */
export function getUserProfile() {
  return fetch(`${API_PREFIX}/info/detail`, {
    method: 'GET'
  })
}

export interface IBasicUserInfo {
  headImg?: string
  introduction?: string
  userName?: string
  phone?: string
}

/**
 * 编辑用户信息
 * @param params
 */
export function editUserProfile(params: IBasicUserInfo) {
  const token = cookies.get('token')
  return fetch(`${API_PREFIX}/info/edit`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
      Authorization: token ? token : '',
    }
  })
}

/**
 * 编辑用户目标
 * @param goalIds
 */
export function editUserGoals(goalIds: string) {
  return fetch(`${API_PREFIX}/info/goal?goalIds=${goalIds}`, {
    method: 'POST'
  })
}

/**
 * 编辑用户兴趣
 * @param interest
 * @param interestIds
 */
export function editUserInterests(interest: string, interestIds: string) {
  return fetch(
    `${API_PREFIX}/info/interest?interest=${interest}&interestIds=${interestIds}`,
    {
      method: 'POST'
    }
  )
}

/**
 * 上传用户头像
 */
export function uploadUserAvatar(imgFile: FormData) {
  return fetch(`${API_PREFIX}/info/head`, {
    method: 'POST',
    body: imgFile
  })
}

/**
 * 注销用户
 */
export function deleteUser() {
  return fetch(`${API_PREFIX}/info/delete`, {
    method: 'POST'
  })
}
