import { API_PREFIX } from '../constants'
import fetch from '../../utils/fetch'

/**
 * 获取目标列表
 */
export function getObjectivesList() {
  return fetch(`${API_PREFIX}/base/goal`, {
    method: 'GET'
  })
}

/**
 * 获取兴趣列表
 */
export function getInterestsList() {
  return fetch(`${API_PREFIX}/base/interest`, {
    method: 'GET'
  })
}

export interface IUserInfo {
  /**
   * 手机号
   */
  phone: string
  /**
   *  类型 1 注册 2 登录
   */
  type: number
}

/**
 * 为用户发送短信验证码
 * @param param
 */
export function sendVerificationCode(param: IUserInfo) {
  const { phone, type } = param
  return fetch(`${API_PREFIX}/user/send?phone=${phone}&type=${type}`, {
    method: 'POST'
  })
}

export interface IVerificationCodeData {
  phone: string
  code: string
}

/**
 * 校验短信验证码
 * @param data
 */
export function checkVerificationCode(data: IVerificationCodeData) {
  const { phone, code } = data
  return fetch(`${API_PREFIX}/user/valid?phone=${phone}&code=${code}`, {
    method: 'POST'
  })
}

/**
 * 获取用户状态(id及已填写信息等)
 * @param phone
 */
export function getUserStatus(phone: string) {
  return fetch(`${API_PREFIX}/user/status?phone=${phone}`, {
    method: 'GET'
  })
}

export interface IUserData {
  /**
   * 目标id列表 形如'1,2,3,4'
   */
  goalIds?: string
  /**
   * 用户id 通过status获取
   */
  id: string
  /**
   * 兴趣列表
   */
  interest?: string
  /**
   * 兴趣id列表 形如'1,2'
   */
  interestIds?: string
  /**
   * 用户自我介绍
   */
  introduction?: string
  /**
   * 用户姓名
   */
  userName?: string
}

export function register(data: IUserData) {
  return fetch(`${API_PREFIX}/user/register`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * 注册完直接登录 通过后端验证缓存
 * @param phone 用户手机号
 */
export function loginAfterRegister(phone: string) {
  return fetch(`${API_PREFIX}/user/login?phone=${phone}`, {
    method: 'POST'
  })
}

