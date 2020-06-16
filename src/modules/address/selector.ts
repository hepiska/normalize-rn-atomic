import { createSelector } from 'reselect'

const getAddress = (state, props) => state.addresses.data[props.addressId]

export const makeSelectedAddresses = () =>
  createSelector([getAddress], addresses => {
    return addresses
  })
