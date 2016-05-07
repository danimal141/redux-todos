import { Store, createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState?: any): Store {
  return createStore(rootReducer, initialState)
}
