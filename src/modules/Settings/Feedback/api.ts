import { API_PREFIX } from '../../constants'
import fetch from '../../../utils/fetch'

/**
 * 用户提交反馈
 */
export function sendFeedback(feedback: string) {
  const formData = new FormData()
  formData.append('feedback', feedback)
  return fetch(`${API_PREFIX}/action/feedback`, {
    method: 'POST',
    body: formData
  })
}
