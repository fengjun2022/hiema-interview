/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 *
 */
import { createAPI } from '@/utils/request'
// 获取列表
export const list = data => createAPI('/tags', 'get', data)

export const simple = data => createAPI('/tags', 'post')

export const detail = id => createAPI(`/tags/${id}`, 'get')

export const add = data => createAPI('/tags', 'post', data)

export const update = data => createAPI(`/tags/${data.id}`, 'put', data)

export const remove = id => createAPI(`/tags/${id}`, 'delete')

export const changeState = data => createAPI(`/tags/${data.id}/${data.state}`, 'post')
