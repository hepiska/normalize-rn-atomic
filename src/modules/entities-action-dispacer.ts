import { setPostData } from './post/action'
import { setUserData } from './user/action'
import { setCommentData } from './comment/action'

export const dispatchPostEntities = entities => [
  setPostData(entities.post),
  setUserData(entities.user),
  setCommentData(entities.comment),
]
