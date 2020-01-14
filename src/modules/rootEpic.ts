import { combineEpics } from 'redux-observable'
import lookbookEpics from './lookbook/epic'

export default combineEpics(lookbookEpics)