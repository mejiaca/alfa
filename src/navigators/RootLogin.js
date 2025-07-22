/**
 * DAIRY
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();
function RootLogin({navigation}) {
    return(
        <Stack.Navigator
            // initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default RootLogin