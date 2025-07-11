import React, { useContext, useCallback, useState } from 'react';
import { View, Text,  FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import  TopBar from '../components/TopBar';
import  ItemPost from '../components/ItemPost';
import ModalGrupos from '../components/ModalGrupos';
import ModalDialogo from '../components/ModalDialogo';
import { AppContext } from '../context/State';
import { getGroupPosts, getUserFavs } from '../context/Actions';

export default function FeedScreen({ route, navigation }) {
  const { dispatch, user, posts, storagePath } = useContext(AppContext);
  const { groupId, groupName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDialogo, setModalDialogo] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getGroupPosts(dispatch, groupId);
      getUserFavs(dispatch, user.user_id);
    }, [])
  );

  const groupInfo = () => {
    dispatch({ type: 'SET_GROUP_MEMBERS', payload: []});
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <ItemPost item={item} storagePath={storagePath} setModalDialogo={setModalDialogo}/>
  );

  return (
    <View style={styles.container}>
      <TopBar titulo={groupName} tipo={'feed'} navigation={navigation} groupId={groupId} onPress={groupInfo}/>

      {posts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay publicaciones aún. ¡Sé el primero en compartir algo!
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
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

      <ModalDialogo 
        tipo={'comment'}
        title={'Agregar comentario'}
        modalVisible={modalDialogo} 
        setModalVisible={setModalDialogo}
        // editedTitle={editedTitle}
        // setEditedTitle={setEditedTitle}
        // editedComment={editedComment}
        // setEditedComment={setEditedComment}
      />

      <ModalGrupos visible={modalVisible} closeContacts={closeModal} navigation={navigation}/>

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
    paddingBottom:100
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
