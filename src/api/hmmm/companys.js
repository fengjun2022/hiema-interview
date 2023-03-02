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
export const update = data => createAPI(`/companys/${data.userId}`, 'get', data)
export const remove = data => createAPI(`/companys/${data.id}`, 'delete')
export const detail = data => createAPI(`/companys/${data.userId}`, 'post', data)
export const disabled = data => createAPI(`/companys/${data.id}/${data.state}`, 'post', data)

