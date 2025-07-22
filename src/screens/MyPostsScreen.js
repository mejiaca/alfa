import React, { useContext, useState, useEffect, useCallback } from 'react';
import {  View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import  TopBar from '../components/TopBar';
import  ItemUserPost from '../components/ItemUserPost';
import { AppContext } from '../context/State';
import { getUserPosts  } from '../context/Actions';


export default function MyPostsScreen({navigation}) {
  const { dispatch, user, userPosts } = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      getUserPosts(dispatch, user.user_id);
    }, [])
  ); 

  const renderItem = ({ item }) => (
    <ItemUserPost 
      item={item}  
      navigation={navigation} 
      tipo={'post'}
    />
  );

  if (userPosts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noPosts}>Aún no has subido publicaciones.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TopBar navigation={navigation}/>

      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

    </View>
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
