import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PostCard({ post }) {
  const navigation = useNavigation();

  const handleImagePress = () => {
    navigation.navigate('ImageView', { imageUri: post.image });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.comment}>{post.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 280,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  comment: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
