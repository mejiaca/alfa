import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PostsContext } from '../context/PostsContext';
import  TopBar from '../components/TopBar';

const screenWidth = Dimensions.get('window').width;

export default function HomeFeedScreen({ route, navigation }) {
  const { posts, isPostsLoading } = useContext(PostsContext); // ✅ ahora con loading
  // const { groupId, groupName } = route.params;
  const  groupId = 0;
  const  groupName = '';

  if (!groupId || !groupName) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Error: grupo no disponible.</Text>
      </View>
    );
  }

  if (isPostsLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Cargando publicaciones...</Text>
      </View>
    );
  }

  const groupPosts = posts
    .filter((post) => post.groupId === groupId)
    .sort((a, b) => b.timestamp - a.timestamp);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ImageViewer', { image: item.image })
        }
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay publicaciones aún. ¡Sé el primero en compartir algo!
          </Text>
        </View>

      <Text style={styles.header}>{groupName}</Text>
      {groupPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay publicaciones aún. ¡Sé el primero en compartir algo!
          </Text>
        </View>
      ) : (
        <FlatList
          data={groupPosts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('CreatePost', {
            groupId,
            groupName,
          })
        }
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 80,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 12,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  imageWrapper: {
    position: 'relative',
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dateText: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007aff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
