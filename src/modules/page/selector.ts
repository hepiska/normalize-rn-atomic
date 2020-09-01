import { createSelector } from 'reselect'
import { deepClone } from '@utils/helpers'

import { cos } from 'react-native-reanimated'

const initialData = {}

const getshopPage = state => state.page.data.shop
const getSection = state => state.page.section
const getfeedPage = state => state.page.data.feed

export const makeGetShopPage = () =>
  createSelector([getshopPage, getSection], (shop, section) => {
    let denormalizedPage: any = {}
    if (shop) {
      denormalizedPage = deepClone(shop)
      denormalizedPage.section = denormalizedPage.section
        .map(sectionId => section[sectionId])
        .sort((a, b) => {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
          return 0
        })
    }
    return denormalizedPage
  })

export const makeGetFeedPage = () =>
  createSelector([getfeedPage, getSection], (feed, section) => {
    let denormalizedPage: any = {}
    if (feed) {
      denormalizedPage = deepClone(feed)
      denormalizedPage.section = denormalizedPage.section
        .map(sectionId => section[sectionId])
        .sort((a, b) => {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
          return 0
        })
    }
    return denormalizedPage
  })
