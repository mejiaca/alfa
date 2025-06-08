import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { PostsContext } from '../context/PostsContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout, isAuthLoading } = useContext(AuthContext);
  const { posts } = useContext(PostsContext);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileImage = async () => {
      const savedUri = await AsyncStorage.getItem('profileImage');
      if (savedUri) setProfileImage(savedUri);
    };
    loadProfileImage();
  }, []);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  const handleRemoveImage = async () => {
    Alert.alert('Eliminar foto', '¿Deseas quitar tu foto de perfil?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Quitar',
        style: 'destructive',
        onPress: async () => {
          setProfileImage(null);
          await AsyncStorage.removeItem('profileImage');
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  // ✅ Protección: espera que el usuario esté cargado
  if (isAuthLoading || !user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  const postCount = posts.filter((p) => p.username === user.username).length;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage} onLongPress={handleRemoveImage}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/avatar.png')
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.stats}>Publicaciones: {postCount}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.note}>Toque para cambiar la foto. Mantén presionado para quitarla.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  stats: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
