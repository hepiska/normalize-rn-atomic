import { createSelector } from 'reselect'
import { calculateTimeDifference } from '@utils/helpers'

const getSocial = (state, props) => state.notifications.data.social[props]
const getOrderSocial = state => state.notifications.order_social
const getDataSocial = state => state.notifications.data.social

export const makeSelectedSocial = () =>
  createSelector([getSocial], social => {
    return social
  })

export const makeSelectedGroupData = () =>
  createSelector([getOrderSocial, getDataSocial], (orderSocial, dataSocial) => {
    const groupData = orderSocial.reduce((total, currentValue) => {
      let selectedItem = dataSocial[currentValue]
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
  })
