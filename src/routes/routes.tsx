import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@pages/login';
import Register from '@pages/register';
import Home from '@pages/home';
import Profile from '@pages/profile';
import BackButton from '@components/BackButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerTitleStyle: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        fontWeight: "400",
      },
    }}>
      <Tab.Screen name='HomeScreen' component={Home} options={{title: 'Home'}} />
      <Tab.Screen name='Profile' component={Profile} options={{title: 'Perfil'}} />
    </Tab.Navigator>
  );
};

const MainRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Poppins-Regular',
        },
        headerBackTitle: 'Voltar',
        headerLeft: () => <BackButton />,
      }}>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name='Register' component={Register} options={{title: 'Cadastro'}} />
      <Stack.Screen name='Home' component={HomeRoutes} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
