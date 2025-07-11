import React, { useContext, useState, useEffect, useCallback } from 'react';
import {  View, Text, FlatList, Image, StyleSheet, Alert, TextInput, Button, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import  TopBar from '../components/TopBar';
import  ItemUserPost from '../components/ItemUserPost';
import { AppContext } from '../context/State';
import { getUserPosts, updatePost  } from '../context/Actions';


export default function ModalDialogo({title, tipo, modalVisible, setModalVisible, editedTitle, setEditedTitle, editedComment, setEditedComment}) {
  const { dispatch, user, userPosts } = useContext(AppContext);
  const [selectedPost, setSelectedPost] = useState(null);
//   const [editedTitle, setEditedTitle] = useState('');
//   const [editedComment, setEditedComment] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserPosts(dispatch, user.user_id);
    }, [])
  ); 

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditedTitle(post.title);
    setEditedComment(post.comment);
    // setModalVisible(true);
  };

  const handleUpdate = () => {
    // if (!editedTitle.trim() || !editedComment.trim()) {
    //   Alert.alert('Faltan datos', 'Completa todos los campos.');
    //   return;
    // }

    // updatePost({
    //   ...selectedPost,
    //   title: editedTitle,
    //   comment: editedComment,
    // });

    setModalVisible(false);
  };

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
            />
            ):null}

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Nuevo comentario"
              multiline
              value={editedComment}
              onChangeText={setEditedComment}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={handleUpdate} />
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
