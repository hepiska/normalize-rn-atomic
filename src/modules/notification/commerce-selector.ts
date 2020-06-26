import { createSelector } from 'reselect'
import { calculateTimeDifference } from '@utils/helpers'

const getCommerce = (state, props) => state.notifications.data.ecommerce[props]
const getOrderCommerce = state => state.notifications.order_ecommerce
const getDataCommerce = state => state.notifications.data.ecommerce

export const makeSelectedCommerce = () =>
  createSelector([getCommerce], ecommerce => {
    return ecommerce
  })

export const makeSelectedGroupData = () =>
  createSelector(
    [getOrderCommerce, getDataCommerce],
    (orderCommerce, dataCommerce) => {
      const groupData = orderCommerce.reduce((total, currentValue) => {
        let selectedItem = dataCommerce[currentValue]
        let calc = calculateTimeDifference(selectedItem.updated_at)

        if (calc.month > 0) {
          if (total['year']) {
            total['year'].data.push(selectedItem.id)
          } else {
            total['year'] = {
              title: 'Earlier',
              data: [selectedItem.id],
            }
          }
        } else {
          if (calc.week > 0) {
            if (total['month']) {
              total['month'].data.push(selectedItem.id)
            } else {
              total['month'] = {
                title: 'This Month',
                data: [selectedItem.id],
              }
            }
          } else {
            if (calc.days > 0) {
              if (total['week']) {
                total['week'].data.push(selectedItem.id)
              } else {
                total['week'] = {
                  title: 'This Week',
                  data: [selectedItem.id],
                }
              }
            } else {
              if (calc.now.get('hour') - calc.hours > 0) {
                if (total['today']) {
                  total['today'].data.push(selectedItem.id)
                } else {
                  total['today'] = {
                    title: 'Today',
                    data: [selectedItem.id],
                  }
                }
              } else {
                if (total['yesterday']) {
                  total['yesterday'].data.push(selectedItem.id)
                } else {
                  total['yesterday'] = {
                    title: 'Yesterday',
                    data: [selectedItem.id],
                  }
                }
              }
            }
          }
        }

        return total
      }, {})
      let data = Object.keys(groupData).map(k => groupData[k])
      return data
    },
  )
