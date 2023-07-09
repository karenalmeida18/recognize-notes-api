import { Home } from './src/screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Instructions from './src/components/instructions';

const { Screen, Navigator } = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Navigator>
        {/* @ts-expect-error - component */}
        <Screen options={{ headerShown: false }} name="instructions" component={Instructions} />
        <Screen options={{ headerShown: false }} name="home" component={Home} />
      </Navigator>
      <Toast />
    </NavigationContainer>
    </>
  );
}
