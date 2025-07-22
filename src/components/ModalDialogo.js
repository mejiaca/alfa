import React, { useContext, useState, useEffect, useCallback } from 'react';
import {  View, Text, FlatList, Image, StyleSheet, Alert, TextInput, Button, Modal, Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../context/State';
import { getUserPosts, updatePost, addComment  } from '../context/Actions';


export default function ModalDialogo({item, post_id, getComments, title, tipo, modalVisible, setModalVisible}) {
  const { dispatch, user } = useContext(AppContext);
  const [comment, setComment] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    if(tipo == 'post' && item){
      setEditedTitle(item.title);
      setComment(item.comment);
    }
  }, [modalVisible]);

  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, [])
  ); 

  const getPosts = () => {
    getUserPosts(dispatch, user.user_id);
  }

  const handleComment = () => {
    
    if(comment == ''){
      Alert.alert('Faltan datos', 'Completa todos los campos.'); return;
    }

    if(tipo == "post"){
      if(editedTitle == ''){
        Alert.alert('Faltan datos', 'Completa todos los campos.'); return;
      }

      let obj = {
        title: editedTitle,
        comment,
      }
      updatePost(dispatch, post_id, obj, getPosts);
    }

    if(tipo == "comment"){
      const uniqueId = `${Date.now()}-${user.user_id}`;
      let obj = {
        id: uniqueId,
        comment,
        timestamp: Date.now(),
        post_id:post_id,
        user_id: user.user_id,
      }
      addComment(dispatch, obj, getComments);
    }

    setComment('');
    setModalVisible(false);
  };

  const setTextComent = (val) => {
    setComment(val);
  }

  

  return (
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.editModal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{title}</Text>

            {tipo == 'post' ? (
            <TextInput
              style={styles.input}
              placeholder="Nuevo título"
              value={editedTitle}
              onChangeText={setEditedTitle}
              blurOnSubmit={true}
              onSubmitEditing={() => Keyboard.dismiss()} 
            />
            ):null}

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Nuevo comentario"
              multiline
              value={comment}
              onChangeText={setTextComent}
              blurOnSubmit={true}
              onSubmitEditing={() => Keyboard.dismiss()} 
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={handleComment} />
            </View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom:10
  },
  imageContainer: {
    position: 'relative',
    margin: 6,
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
  editButton: {
    position: 'absolute',
    bottom: 6,
    left: 6,
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
  editModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
