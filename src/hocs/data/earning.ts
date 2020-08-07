import { connect } from 'react-redux'

const earningListmap = () => {
  return (state, ownProps) => {
    const earning = state.earnings.data[ownProps.earningId]
    return {
      ...earning,
    }
  }
}
export function earningData(WrappedComponent) {
  return connect(earningListmap, null)(WrappedComponent)
}
