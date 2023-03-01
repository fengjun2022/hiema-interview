/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'
export const getsubjects = data => createAPI('/subjects', 'get', data)
// 学科添加
export const addsubjects = data => createAPI('/subjects', 'post', data)
// 学科详情
export const getsubject = id => createAPI(`/subjects/${id}`, 'get')
// 学科修改
export const editsubjects = data => createAPI(`/subjects/${data.id}`, 'put', data)
// 删除学科
export const deletesubjects = id => createAPI(`/subjects/${id}`, 'delete')
