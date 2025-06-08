import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PostsContext } from '../context/PostsContext';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemSize = screenWidth / numColumns;

const groups = [
  { id: '1', name: 'Familia' },
  { id: '2', name: 'Amigos' },
  { id: '3', name: 'Trabajo' },
  { id: '4', name: 'Creativos' },
  { id: '5', name: 'Viajes' },
  { id: '6', name: 'Colegio' },
];

export default function GroupListScreen({ navigation }) {
  const { posts } = useContext(PostsContext);

  const getLatestImageForGroup = (groupId) => {
    const groupPosts = posts
      .filter((post) => post.groupId === groupId)
      .sort((a, b) => b.timestamp - a.timestamp);
    return groupPosts.length > 0 ? groupPosts[0].image : null;
  };

  const renderItem = ({ item }) => {
    const image = getLatestImageForGroup(item.id);

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.navigate('Feed', {
              groupId: item.id,
              groupName: item.name,
            })
          }
        >
          <ImageBackground
            source={image ? { uri: image } : require('../../assets/placeholder.png')}
            style={styles.image}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={numColumns}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  item: {
    width: itemSize - 12,
    margin: 6,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 12,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

