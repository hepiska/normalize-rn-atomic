import { schema, normalize } from 'normalizr'

export const lookbooks = new schema.Entity('lookbooks')

export const comment = new schema.Entity('comment')

export const user = new schema.Entity('user')

export const brand = new schema.Entity('brand')

export const attribute = new schema.Entity(
  'attribute',
  {},
  { idAttribute: 'attribute_id' },
)

export const category = new schema.Entity(
  'category',
  {
    children: [
      new schema.Entity(
        'category',
        {
          children: [
            new schema.Entity(
              'category',
              {},
              {
                processStrategy: entity => {
                  if (entity.children)
                    entity.data = entity.children.map(({ id }) => id)
                  else entity.data = []
                  return entity
                },
              },
            ),
          ],
        },
        {
          processStrategy: entity => {
            if (entity.children)
              entity.data = entity.children.map(({ id }) => id)
            else entity.data = []

            return entity
          },
        },
      ),
    ],
    parent: new schema.Entity('category', {
      parent: new schema.Entity('category'),
    }),
  },
  {
    processStrategy: entity => {
      if (entity.children) entity.data = entity.children.map(({ id }) => id)
      else entity.data = []

      return entity
    },
  },
)

export const product = new schema.Entity('product', {
  brand: brand,
  categories: [category],
  attributes: [attribute],
})

export const collection = new schema.Entity('collection', {
  brands: [brand],
  products: [product],
  categories: [category],
})

export const post = new schema.Entity('post', {
  comments: [comment],
  user: user,
})

export const pageSection = new schema.Entity('section', {
  posts: [post],
  products: [product],
  brands: [brand],
})

export const detailCategory = new schema.Entity('category', {
  categories: [category],
  brands: [brand],
  products: [product],
})

export const brandFull = new schema.Entity('brand', {
  brands: [brand],
  products: [product],
  categories: [category],
})

export const page = new schema.Entity(
  'page',
  { section: [pageSection] },
  { idAttribute: 'page' },
)

export const cart = new schema.Entity('cart')
