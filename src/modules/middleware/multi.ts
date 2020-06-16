import { batch } from 'react-redux'

const multi = ({ dispatch }) => next => action => {
  if (!Array.isArray(action)) {
    return next(action)
  }
  batch(() => {
    action.forEach(item => dispatch(item))
  })
}

export default multi
