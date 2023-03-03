/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

import { createAPI } from '@/utils/request'

export const list = data => createAPI('/companys', 'get', data)
export const add = data => createAPI('/companys', 'post', data)
export const update = data => createAPI(`/companys/${data.id}`, 'put', data)
export const remove = id => createAPI(`/companys/${id}`, 'delete')
export const detail = id => createAPI(`/companys/${id}`, 'get', id)
export const disabled = data => createAPI(`/companys/${data.id}/${data.state}`, 'post', data)

