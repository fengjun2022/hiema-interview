/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

<<<<<<< HEAD
import createAPI from '@/utils/request'

export const list = data => createAPI('/comapnys', 'post')
export const add = data => createAPI('/comapnys', 'post', data)
export const update = data =>
  createAPI(`/comapnys/${data.userId}`, 'get', data)
export const remove = data => createAPI(`/comapnys/${data.id}`, 'get')
export const detail = data =>
  createAPI(`/comapnys/${data.userId}`, 'post', data)
export const disabled = data => createAPI('/comapnys/state', 'post', data)
=======
import { createAPI } from '@/utils/request'

export const list = data => createAPI('/companys', 'get', data)
export const add = data => createAPI('/companys', 'post', data)
export const update = data =>
  createAPI(`/companys/${data.userId}`, 'get', data)
export const remove = data => createAPI(`/companys/${data.id}`, 'get')
export const detail = data =>
  createAPI(`/companys/${data.userId}`, 'post', data)
export const disabled = data => createAPI('/companys/state', 'post', data)
>>>>>>> 7e633bcf6e6c1300f3863139d211b86eb86e7b8e
