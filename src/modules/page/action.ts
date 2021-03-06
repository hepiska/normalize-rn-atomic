import { API } from '../action-types'
import { setUserData } from '../user/action'
import { setBrandData } from '../brand/action'
import { setPostData } from '../post/action'
import { setProductData } from '../product/action'
import * as schema from '@modules/normalize-schema'
import { setProductAttributeData } from '../product-attribute/action'
import { setCommentData } from '../comment/action'

export const pageActionType = {
  SET_PAGE: 'page/SET_PAGE',
  SET_LOADING: 'page/SET_LOADING',
  SET_ERROR: 'page/SET_ERROR',
  SET_SECTION: 'page/SET_SECTION',
  CLEAR_PAGE: 'page/CLEAR_PAGE',
}

export const setPageLoading = (data: any) => {
  return { type: pageActionType.SET_LOADING, payload: data }
}

export const setPage = (data: any) => {
  return { type: pageActionType.SET_PAGE, payload: data }
}

export const setSection = (data: any) => {
  return { type: pageActionType.SET_SECTION, payload: data }
}
export const clearPageData = () => ({ type: pageActionType.CLEAR_PAGE })
export const getPage = (pagename, params?) => ({
  type: API,
  payload: {
    url: '/pages',
    requestParams: { params: { client: 'web', page: pagename, ...params } },
    schema: schema.page,
    startNetwork: () => {
      return setPageLoading({ key: pagename, value: true })
    },
    success: data => {
      return [
        setUserData(data.entities.user),
        setBrandData(data.entities.brand),
        setPostData(data.entities.post),
        // setProductAttributeData(data.entities.attribute),
        setCommentData(data.entities.comment),
        setProductData(data.entities.product),
        setSection(data.entities.section),
        setPage(data.entities.page),
        setPageLoading({ key: pagename, value: false }),
      ]
    },
  },
})
