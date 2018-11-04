import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistCombineReducers, persistStore } from 'redux-persist';

import promise from './promise';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['global']
};

const reducer = persistCombineReducers(persistConfig, reducers);

const enhancer = compose(
  applyMiddleware(thunk, promise),
);

export default function configureStore() {

  const store = createStore(reducer, enhancer);
  const persistor = persistStore(store);

  return { store, persistor };
}
