import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PostsProvider } from './src/context/PostsContext';
import { AuthProvider } from './src/context/AuthContext';

import GroupListScreen from './src/screens/GroupListScreen';
import FeedScreen from './src/screens/FeedScreen';
import CreatePostScreen from './src/screens/CreatePostScreen'; // o UploadScreen si decides renombrar
import MyPostsScreen from './src/screens/MyPostsScreen';
import ImageViewerScreen from './src/screens/ImageViewerScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Groups') iconName = 'grid-outline';
          else if (route.name === 'MyPosts') iconName = 'albums-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Groups" component={GroupListScreen} />
      <Tab.Screen name="MyPosts" component={MyPostsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('username');
      setInitialRoute(user ? 'MainTabs' : 'Login');
      setIsLoading(false);
    };
    checkUser();
  }, []);

  if (isLoading) return null;

  return (
    <AuthProvider>
      <PostsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Feed" component={FeedScreen} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} />
            <Stack.Screen name="ImageViewer" component={ImageViewerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PostsProvider>
    </AuthProvider>
  );
}
