/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import GroupListScreen from '../screens/GroupListScreen';
import GroupEditScreen from '../screens/GroupEditScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import MyFavoritesScreen from '../screens/MyFavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import InviteUsersScreen from '../screens/InviteUsersScreen';
import CommentsUsersScreen from '../screens/CommentsUsersScreen';
import ImageViewerScreen from '../screens/ImageViewerScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Inicio') iconName = 'home-outline';
                    else if (route.name === 'Grupos') iconName = 'grid-outline';
                    else if (route.name === 'Mis Posts') iconName = 'albums-outline';
                    else if (route.name === 'Favoritos') iconName = 'heart-outline';
                    else if (route.name === 'Perfil') iconName = 'person-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarIconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarActiveTintColor: '#007aff',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Grupos" component={GroupListScreen} />
            <Tab.Screen name="Mis Posts" component={MyPostsScreen} />
            <Tab.Screen name="Favoritos" component={MyFavoritesScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
}


function RootNavigation({ navigation }) {
    return(
        <Stack.Navigator
            // initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="InviteUsers" component={InviteUsersScreen}/>
            <Stack.Screen name="CommentsUsers" component={CommentsUsersScreen}  options={{ contentStyle: { backgroundColor: 'transparent' }, presentation: 'modal', headerShown: false }}/>
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="ImageViewer" component={ImageViewerScreen} />
            <Stack.Screen name="EditGroup" component={GroupEditScreen} />
        </Stack.Navigator>
    )
}

export default RootNavigation