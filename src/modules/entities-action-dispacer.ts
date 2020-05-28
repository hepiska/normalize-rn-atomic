import { setPostData } from './post/action'
import { setUserData } from './user/action'
import { setCommentData } from './comment/action'
import { setBrandData } from '@modules/brand/action'
import { setCategoryData } from '@modules/category/action'
import { setProductData } from '@modules/product/action'

export const dispatchPostEntities = entities => [
  setPostData(entities.post),
  setUserData(entities.user),
  setCommentData(entities.comment),
]

export const dispatchProductEntities = entities => [
  setBrandData(entities.brand),
  setCategoryData(entities.category),
  setProductData(entities.product),
]
