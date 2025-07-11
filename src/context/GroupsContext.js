import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [userGroupsMap, setUserGroupsMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedGroups = await AsyncStorage.getItem('groups');
        const storedMap = await AsyncStorage.getItem('userGroupsMap');

        if (storedGroups) {
          const parsedGroups = JSON.parse(storedGroups);
          // console.log('📁 Grupos cargados desde storage:', parsedGroups);
          setGroups(parsedGroups);
        } else {
          console.log('📁 No hay grupos almacenados');
        }

        if (storedMap) {
          const parsedMap = JSON.parse(storedMap);
          // console.log('📌 Mapa de usuarios a grupos cargado:', parsedMap);
          setUserGroupsMap(parsedMap);
        } else {
          console.log('📌 No hay mapa de usuarios almacenado');
        }
      } catch (error) {
        console.error('❌ Error cargando datos desde AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('groups', JSON.stringify(groups)).then(() => {
      // console.log('✅ Grupos guardados:', groups);
    });
  }, [groups]);

  useEffect(() => {
    AsyncStorage.setItem('userGroupsMap', JSON.stringify(userGroupsMap)).then(() => {
      // console.log('✅ Mapa usuario-grupos guardado:', userGroupsMap);
    });
  }, [userGroupsMap]);

  const addGroup = (group) => {
    console.log('➕ Añadiendo grupo:', group);
    setGroups((prev) => [...prev, group]);
  };

  const deleteGroup = (groupId) => {
    console.log('🗑️ Eliminando grupo con ID:', groupId);
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    setUserGroupsMap((prev) => {
      const updated = {};
      for (const user in prev) {
        updated[user] = prev[user].filter((id) => id !== groupId);
      }
      return updated;
    });
  };

  // ✅ Corregido: ahora devuelve una promesa
  const inviteUserToGroup = (username, groupId) => {
    return new Promise((resolve) => {
      console.log(`📨 Invitando a ${username} al grupo ${groupId}`);
      setUserGroupsMap((prev) => {
        const userGroups = prev[username] || [];
        if (!userGroups.includes(groupId)) {
          const updatedMap = {
            ...prev,
            [username]: [...userGroups, groupId],
          };
          AsyncStorage.setItem('userGroupsMap', JSON.stringify(updatedMap)).then(() => {
            console.log('✅ Usuario agregado al grupo y guardado');
            resolve();
          });
          return updatedMap;
        } else {
          console.log('ℹ️ Usuario ya está en el grupo');
          resolve();
          return prev;
        }
      });
    });
  };

  const getUserGroupss = (username) => {
    const userGroupIds = userGroupsMap[username] || [];
    const result = groups.filter((group) => userGroupIds.includes(group.id));
    console.log(`👀 Grupos visibles para ${username}:`, result);
    return result;
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        addGroup,
        deleteGroup,
        inviteUserToGroup,
        getUserGroupss,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
