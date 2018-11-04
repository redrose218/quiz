import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '@src/configureStore';
import App from '@src/navigators';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule was not exported']);

const { store, persistor } = configureStore();

export default class Root extends React.PureComponent {
  
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
};
