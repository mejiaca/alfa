import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostsContext } from '../context/PostsContext';
import { AuthContext } from '../context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 2 - 12;

export default function MyPostsScreen() {
  const { posts, removePost } = useContext(PostsContext);
  const { user } = useContext(AuthContext);

  const myPosts = posts.filter((post) => post.username === user?.username);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES');
  };

  const confirmDelete = (postId) => {
    Alert.alert(
      'Eliminar publicación',
      '¿Estás seguro de que deseas eliminar esta publicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removePost(postId),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {/* Fecha (centro inferior) */}
      <View style={styles.dateOverlay}>
        <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
      </View>

      {/* Canasta (esquina inferior derecha) */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Ionicons name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (myPosts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noPosts}>Aún no has subido publicaciones.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myPosts}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  imageContainer: {
    position: 'relative',
    margin: 6,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosts: {
    fontSize: 16,
    color: '#666',
  },
});

