import React, { useEffect, useState, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';
import * as Linking from 'expo-linking';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { PostsProvider } from './src/context/PostsContext';
import { GroupsProvider, GroupsContext } from './src/context/GroupsContext';

import GroupListScreen from './src/screens/GroupListScreen';
import FeedScreen from './src/screens/FeedScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
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

function AppContent() {
  const { user, isAuthLoading, login } = useContext(AuthContext);
  const { inviteUserToGroup } = useContext(GroupsContext);
  const [initialRoute, setInitialRoute] = useState(null); // <- actualizado
  const navigationRef = useRef();

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const data = Linking.parse(event.url);
      if (data.scheme === 'clanapp' && data.path === 'invite') {
        const { groupId, groupName, username } = data.queryParams;

        if (username) {
          await login(username);
        }

        if (username && groupId) {
          inviteUserToGroup(username, groupId);
        }

        setTimeout(() => {
          navigationRef.current?.navigate('Feed', {
            groupId,
            groupName,
          });
        }, 500);
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      setInitialRoute(user ? 'MainTabs' : 'Login'); // <- actualizado
    }
  }, [isAuthLoading, user]);

  if (isAuthLoading || !initialRoute) {
    // <- actualizado
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="ImageViewer" component={ImageViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <GroupsProvider>
          <AppContent />
        </GroupsProvider>
      </PostsProvider>
    </AuthProvider>
  );
}
