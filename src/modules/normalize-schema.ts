import { schema } from 'normalizr';

export const lookbooks = new schema.Entity('lookbooks');

export const comment = new schema.Entity('comment');

export const user = new schema.Entity('user');

export const post = new schema.Entity('post', {
  comments: [comment],
  user: user,
});
