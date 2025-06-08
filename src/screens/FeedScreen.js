import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PostsContext } from '../context/PostsContext';

export default function FeedScreen({ route, navigation }) {
  const { posts } = useContext(PostsContext);
  const { groupId, groupName } = route.params;

  const groupPosts = posts
    .filter((post) => post.groupId === groupId)
    .sort((a, b) => b.timestamp - a.timestamp);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ImageViewer', { image: item.image })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
    padding: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 12,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
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


