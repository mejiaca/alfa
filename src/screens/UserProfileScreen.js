import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { PostsContext } from '../context/PostsContext';

export default function UserProfileScreen({ route, navigation }) {
  const { username } = route.params || {};
  const { posts } = useContext(PostsContext);

  const userPosts = posts.filter((post) => post.username === username);

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/avatar.png')} // o usa un avatar por defecto
          style={styles.avatar}
        />
        <Text style={styles.username}>{username}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Tus publicaciones</Text>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 40,
  },
  postCard: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  comment: {
    color: '#333',
    marginTop: 4,
  },
});
