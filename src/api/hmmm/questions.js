/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'
// 回显
export const getQuestionDetail = data => createAPI(`/questions/${data.id}`, 'get', data)

export function getsubjectIDList () {
  return createAPI('/subjects/simple', 'get')
}

export function getCatalogIDList (data) {
  return createAPI('/directorys', 'get', data)
}

export function getCompanysList () {
  return createAPI('/companys', 'get', { pagesize: 20 })
}

// 提交
export function addQuestions (data) {
  return createAPI('/questions', 'post', data)
}

export function setQuestions (id) {
  return createAPI(`/questions/${id}`, 'GET')
}
