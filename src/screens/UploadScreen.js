import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PostsContext } from '../context/PostsContext';

export default function UploadScreen({ route, navigation }) {
  const { addPost } = useContext(PostsContext);
  const { groupId, groupName } = route.params || {};
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    pickImage();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image || !comment || !title || !groupId) {
      Alert.alert('Faltan datos', 'Debes completar todos los campos y seleccionar un grupo.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      image,
      title,
      comment,
      timestamp: Date.now(),
      groupId,
    };

    addPost(newPost);
    setImage(null);
    setTitle('');
    setComment('');
    navigation.navigate('Feed', { groupId, groupName });
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.label}>Grupo: {groupName || 'Sin grupo'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Comentario (máx. 100 palabras)"
        multiline
        maxLength={600}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Publicar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
});

