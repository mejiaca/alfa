import React, { createContext, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  // Agrega una nueva publicación
  const addPost = (post) => {
    setPosts((prev) => [...prev, post]);
  };

  // Elimina una publicación específica por ID
  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, removePost }}>
      {children}
    </PostsContext.Provider>
  );
};
