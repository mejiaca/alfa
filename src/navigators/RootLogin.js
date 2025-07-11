/**
 * DAIRY
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
// import Intro from '../screens/Intro';
// import Login from '../screens/Login';
// import Registro from '../screens/Registro';
// import Recordar from '../screens/Recordar';
// import global from '../managers/Global';


// const MenuStack = createStackNavigator();
const Stack = createNativeStackNavigator();
function RootLogin({navigation}) {
    return(
        <Stack.Navigator
            // initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="MainTabs" component={MainTabs} /> */}
            {/* <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="ImageViewer" component={ImageViewerScreen} /> */}
        </Stack.Navigator>
    )
    /*
    return (
        <MenuStack.Navigator screenOptions={{ animationEnabled: false  }}>
            <MenuStack.Screen 
                name="Intro" 
                component={Intro}
                options= {{
                    headerShown: false,
                }} 
            />
            <MenuStack.Screen 
                name="Login" 
                component={Login}
                options= {{
                    title: '', 
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation:0
                    },
                    headerTitleStyle: {
                        color: 'black',
                        fontSize: 20
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: global.color.naranja,
                }} 
            />
            <MenuStack.Screen 
                name="Registro" 
                component={Registro}
                options= {{
                    title: '', 
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation:0
                    },
                    headerTitleStyle: {
                        color: 'black',
                        fontSize: 20
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: global.color.naranja,
                }} 
            />
            <MenuStack.Screen 
                name="Recordar" 
                component={Recordar}
                options= {{
                    title: '', 
                    headerStyle: {
                        backgroundColor: 'white',
                        elevation:0
                    },
                    headerTitleStyle: {
                        color: 'black',
                        fontSize: 20
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: global.color.naranja,
                }} 
            />
        </MenuStack.Navigator>
    );
    */
}

export default RootLogin