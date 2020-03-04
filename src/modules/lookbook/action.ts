import { QueryParams } from '@utils/globalInterface';
import * as schema from '@modules/normalize-schema';

import { API } from '../action-types';

export const lookbookActionType = {
  FETCH: 'LOOKBOOK/FETCH',
  FETCH_FINISH: 'LOOKBOOK/FETCH_FINISH',
  FETCH_START: 'LOOKBOOK/FETCH_START',
  ERROR: 'LOOKBOOK/ERROR',
};

// export const PostTopApi = params => ({
//   type: API,
//   payload: {
//     url: '/posts/top',
//     requestParams: { ...params },
//     schema: [schema.post],
//     success: (data, { pagination }) => [
//       setPostData(data.entities.post),
//       setTopPostData({ key: params.category_id, data: data.result }),
//       setUserData(data.entities.user),
//     ],
//   },
// });

export const fetchLookbook = (params: QueryParams) => ({
  type: lookbookActionType.FETCH,
  payload: params,
});
export const lookBookApi = params => ({
  type: API,
  payload: {
    url: '/lookbooks',
    schema: [schema.lookbooks],
    requestParams: { params },
    success: (data, { pagination }) =>
      fetchLookbookFinish({
        data: data.entities.lookbooks,
        order: data.result,
        pagination: pagination,
      }),
  },
});

export const fetchLookbookStart = () => ({
  type: lookbookActionType.FETCH_FINISH,
});
export const fetchLookbookFinish = (data: any) => ({
  type: lookbookActionType.FETCH_FINISH,
  payload: data,
});
export const fetchLookbookError = (data: any) => ({
  type: lookbookActionType.ERROR,
  payload: data,
});
