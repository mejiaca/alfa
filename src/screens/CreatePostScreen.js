import React, { useState, useContext, useEffect } from 'react';
import {  View, Text,  TextInput, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { AppContext } from '../context/State';
import { addPost } from '../context/Actions';
import  Boton from '../components/Boton';


export default function CreatePostScreen({ route, navigation }) {
  const { dispatch, user, userGroups } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const { groupId, groupName } = route.params || {};

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

    if (!result.canceled && result.assets.length > 0) {
      const original = result.assets[0];
      const maxWidth = 800;
      const scaleFactor = maxWidth / original.width;
      const newHeight = original.height * scaleFactor;
      const manipulated = await ImageManipulator.manipulateAsync(
        original.uri,
        [
          {
            resize: {
              width: maxWidth,
              height: Math.round(newHeight),
            },
          },
        ],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const uri = manipulated.uri;
      let picname = 'usuarios/'+user.user_id+'.jpg';
      let data = {
        foto: picname + '?' + Date.now()
      }
      // updateUserPic(dispatch, user.user_id, uri, picname, data);
      setImage(uri);
    }
  };

  const cancel = () => {
    if(loading){return;}
    navigation.goBack();
  }

  const handlePost = () => {
    if(loading){return;}

    if (!title.trim() || !comment.trim() || !image) {
      Alert.alert('Faltan datos', 'Completa todos los campos e incluye una imagen.');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    let post = {
      id: uniqueId,
      image: uniqueId + '.jpg',
      title,
      comment,
      timestamp: Date.now(),
      groupid:groupId,
      user_id: user.user_id,
    }

    setLoading(true);
    addPost(dispatch, post, image, groupId, endPost);
  };

   const endPost = () => {
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
   }

  return (
    <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
    <View style={styles.container}>
      {image && (
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
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
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()} 
      />

      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:20}}>
        <Boton titulo={'Cancelar'} onPress={cancel}/>
        <Boton titulo={loading ? 'Publicando...':'Publicar'} onPress={handlePost}/>
      </View>


    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    flex: 1,
    paddingHorizontal:20,
    justifyContent:'center',
  },
  keyboardView: {
    flex: 1,
  },
  imagePreview: {
    width: 200,
    height: 300,
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
  warningText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});
