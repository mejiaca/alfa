import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PostsContext } from '../context/PostsContext';
import { AuthContext } from '../context/AuthContext';

export default function CreatePostScreen({ route, navigation }) {
  const { groupId, groupName } = route.params;
  const { addPost } = useContext(PostsContext);
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      navigation.goBack(); // si cancela, volver atrás
    }
  };

  const handlePost = () => {
    if (!title.trim() || !comment.trim() || !image) {
      Alert.alert('Faltan datos', 'Completa todos los campos e incluye una imagen.');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    addPost({
      id: uniqueId,
      image,
      title,
      comment,
      groupId,
      timestamp: Date.now(),
      username: user?.username,
    });

    navigation.navigate('MainTabs', {
      screen: 'Feed',
      params: { groupId, groupName },
    });
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Comentario (máx. 100 palabras)"
        value={comment}
        onChangeText={setComment}
        style={[styles.input, styles.textArea]}
        multiline
        maxLength={600}
      />
      <Button title="Publicar" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
