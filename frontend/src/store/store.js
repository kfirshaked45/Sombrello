import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { boardReducer } from './board.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunk]

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

store.subscribe(() => {
  console.log('**** Store state changed: ****')
  console.log('storeState:\n', store.getState())
  console.log('*******************************')
})
