/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

import { createAPI } from '@/utils/request'

export const list = data => createAPI('/comapnys', 'post')
export const add = data => createAPI('/comapnys', 'post', data)
export const update = data =>
  createAPI(`/comapnys/${data.userId}`, 'get', data)
export const remove = data => createAPI(`/comapnys/${data.id}`, 'get')
export const detail = data =>
  createAPI(`/comapnys/${data.userId}`, 'post', data)
export const disabled = data => createAPI('/comapnys/state', 'post', data)
export const list = data => createAPI('/companys', 'get', data)
export const add = data => createAPI('/companys', 'post', data)
export const update = data => createAPI(`/companys/${data.userId}`, 'get', data)
export const remove = data => createAPI(`/companys/${data.id}`, 'delete')
export const detail = data => createAPI(`/companys/${data.userId}`, 'post', data)
export const disabled = data => createAPI(`/companys/${data.id}/${data.state}`, 'post', data)
>>>>>>> b4b707a607ea9c8b94e26db1752c3d0be58a85a7
