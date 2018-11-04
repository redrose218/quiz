import { createStackNavigator } from 'react-navigation';
import HomeScreen from '@containers/home';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: props => ({
        title: 'Test'
      })
    }
  },
  {
    navigationOptions: props => ({
    }),
  }
);
