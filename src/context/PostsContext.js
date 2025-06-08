import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true); // ✅ nuevo estado

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('posts');
        if (savedPosts) {
          setPosts(JSON.parse(savedPosts));
        }
      } catch (e) {
        console.error('Error al cargar posts:', e);
      } finally {
        setIsPostsLoading(false); // ✅ se apaga después de cargar
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const savePosts = async () => {
      try {
        await AsyncStorage.setItem('posts', JSON.stringify(posts));
      } catch (e) {
        console.error('Error al guardar posts:', e);
      }
    };
    savePosts();
  }, [posts]);

  const addPost = (post) => {
    setPosts((prev) => [...prev, post]);
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const removePostsByGroupId = (groupId) => {
    setPosts((prev) => prev.filter((post) => post.groupId !== groupId));
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        removePost,
        updatePost,
        removePostsByGroupId,
        isPostsLoading, // ✅ se expone al contexto
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
