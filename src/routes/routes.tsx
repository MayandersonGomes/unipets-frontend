import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '@pages/login';

const Tab = createBottomTabNavigator();

const Routes = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Login" component={Login} options={{ tabBarStyle: { display: 'none'} }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default Routes;