/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'

export const getBaseInfo = data => createAPI('/questions', 'get', data)

export const deleteBaseInfo = id => createAPI(`/questions/${id}`, 'delete')

export const getBaseById = id => createAPI(`/questions/${id}`, 'get')

export const getChoiceInfo = data => createAPI('/questions/choice', 'get', data)

// 切换是否加入精选
export const toggleChoiceState = ({ id, choiceState }) => createAPI(`/questions/choice/${id}/${choiceState}`, 'patch')

// 切换是否上架
export const togglePublishState = ({ id, publishState }) => createAPI(`/questions/choice/${id}/${publishState}`, 'post')
