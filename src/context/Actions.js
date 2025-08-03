/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import { Alert } from 'react-native';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { signInWithEmailAndPassword, signOut, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, database, ref, set, get, child, query, orderByChild, equalTo, update, remove, storage } from "../managers/Firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

// testdevelop
const databasePath = 'levapan/';


function userExist(a, b) {
  const strA = a.toString();
  const strB = b.toString();
  return strA.includes(strB) || strB.includes(strA);
}


export const setLoading = (dispatch, status) => {
  dispatch({ type: 'SET_LOADING', payload: status });
}

export const setError = (error) => {
  Alert.alert( '¡Ups!', error.toString(),
    [
      {text: 'Cerrar'},
    ],
    { cancelable: false }
  )
}



export const logIn = async (dispatch, user_id, ingresar) => {
  let email = 'admin@levapanapps.com';
  let password = '4dminLev#2406';

  try {
    await signInWithEmailAndPassword(auth, email, password);
    getUser(dispatch, user_id, ingresar);
    
  } catch (error) {
    console.error('Error:', error);
    ingresar(false);
  }
};

export const getUser = async (dispatch, user_id, ingresar) => {
  try {
    const snapshot = await get(child(ref(database), databasePath+ "usuarios/" + user_id));
    if (snapshot.exists()) {
      let data = snapshot.val();
      await AsyncStorage.setItem('user_id', user_id);
      dispatch({ type: 'SET_USER', payload: data });
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_USER_AUTH', payload: true });
      ingresar(true);
    }else {
      ingresar(false);
    }
  } catch (error) {
    ingresar(false);
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const logOut = async (dispatch, salir) => {
  try {
    await signOut(auth);
    // await AsyncStorage.removeItem('user_id');
    await AsyncStorage.clear();
    dispatch({ type: 'SET_USER', payload: {}});
    dispatch({ type: 'SET_USER_AUTH', payload: false});
    dispatch({ type: 'SET_USER_GROUPS', payload: []});
    dispatch({ type: 'SET_USER_FAVS', payload: []});
    dispatch({ type: 'SET_POSTS', payload: []});
    salir();
    console.log('signOut')
  } catch (error) {
    console.log(error)
    throw error;
  }
};



export const createUser = async (dispatch, data, urifoto, nombrefoto, ingresar) => {
  try {
    const snapshot = await get(child(ref(database), databasePath + "usuarios_grupos/" + data.codigo_id));
    console.log(snapshot.val())
    if (snapshot.exists() && snapshot.val().user_id == '') {
      await set(ref(database, databasePath + "usuarios/" + data.user_id), data);
      await update(ref(database, databasePath + "usuarios_grupos/" + data.codigo_id), {user_id: data.user_id});
      setImagen(urifoto, nombrefoto, ingresar, data.user_id);
    }else {
      ingresar(false);
    }
  } catch (error) {
    ingresar(false);
    console.error("Error createUser:", error);
  }
};

export const updateUser = async (dispatch, userid, data, endPost) => {
  update(ref(database, databasePath + "usuarios/" + userid), data)
  .then(() => {
    endPost(true, userid);
  })
  .catch((error) => console.error("Error write db:", error));
};

export const updateUserPic = async (dispatch, userid, image, picname, data, endPost) => {
  update(ref(database, databasePath + "usuarios/" + userid), data)
  .then(() => {
    setImagen(image, picname, endPost, userid);
  })
  .catch((error) => console.error("Error write db:", error));
};

export const updateGroupPic = async (dispatch, groupid, image, picname, data, endPost) => {
  update(ref(database, databasePath + "grupos/" + groupid), data)
  .then(() => {
    setImagen(image, picname, endPost, groupid);
  })
  .catch((error) => console.error("Error write db:", error));
};


export const checkUser = async (phone, groupId, sendinvite) => {
  try {
    const snapshot = await get(child(ref(database), "levapan/usuarios/"));
    if (snapshot.exists()) {
      let obj = snapshot.val();
      let exist = false;
      let invitado_id = '';

      if (obj) {
        const keys = Object.keys(obj);        
        keys.forEach((item, i) => {
          if(userExist(item, phone)){
            exist = true;
            invitado_id = item;
          }
        });
      }

      if(exist){
        const codigo = Math.floor(10000 + Math.random() * 90000);
        let key = Date.now()+"_"+codigo;
        let data = {
          codigo: codigo,
          groupId: groupId,
          user_id: invitado_id
        }
        await set(ref(database, databasePath + "usuarios_grupos/" + key), data);
        sendinvite(false);
      }else{
        sendinvite(true);
      }
    }
  } catch (error) {
    ingresar(false);
    console.error("Error checkUser:", error);
  }
};

export const inviteUser = async (groupId, codigo, invitacionEnviada) => {
  try {
    let data = {
      codigo: codigo,
      groupId: groupId,
      user_id: ''
    }
    const snapshot = await get(child(ref(database), databasePath + "usuarios_grupos/" + codigo));
    if (!snapshot.exists()) {
      const snapshot2 = await set(ref(database, databasePath + "usuarios_grupos/" + codigo), data);
      invitacionEnviada(true);
    }else {
      invitacionEnviada(false);
    }
  } catch (error) {
    invitacionEnviada(false);
    console.error("Error inviteUser:", error);
  }
};





export const createGroup = async (dispatch, user_id, data, get_groups) => {
  set(ref(database, databasePath + "grupos/" + data.groupid), data)
  .then(() => {
    get_groups();
  })
  .catch((error) => console.error("Error write db:", error));
};

export const getUserGroups = async (dispatch, user_id) => {
  try {
    var arr = [];
    var groups = [];
    var groups_data = [];

    const data = query(ref(database, databasePath + "grupos/"), orderByChild("user_id"), equalTo(user_id));
    const snapshot = await get(data);
    if (snapshot.exists()) {
      let objs = snapshot.val();      
      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });
    }

    const data_1 = query(ref(database, databasePath + "usuarios_grupos/"), orderByChild("user_id"), equalTo(user_id));
    const snapshot_1 = await get(data_1);
    if (snapshot_1.exists()) {
      let objs = snapshot_1.val();
      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        if (!groups.includes(obj.groupId)) {
          groups.push(obj.groupId);
        }
      });
    }  

    const promesas = groups.map(async (groupId) => {
      const snapshot_2 = await get(ref(database, databasePath + "grupos/" + groupId));
        if (snapshot_2.exists()) {
          const obj = snapshot_2.val();
          obj.key = groupId;
          arr.push(obj);
          return;
        }
        return null;
    });
    await Promise.all(promesas);


    const promesas2 = arr.map(async (data) => {
      const snapshot_3 = await get(ref(database, databasePath + "usuarios/" + data.user_id));
        if (snapshot_3.exists()) {
          groups_data.push({...data, nombre:snapshot_3.val().nombre});
          return;
        }
        return null;
    });
    await Promise.all(promesas2);

    const sorted = groups_data.sort((a, b) => a.name.localeCompare(b.name));
    dispatch({ type: 'SET_USER_GROUPS', payload: sorted});
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getGroupMembers = async (dispatch, groupid) => {
  try {
    const data = query(ref(database, databasePath + "usuarios_grupos/"), orderByChild("groupId"), equalTo(groupid));
    const snapshot = await get(data);
    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];
      var list = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });

      const promise = arr.map(async (data) => {
        const snapshot_1 = await get(ref(database, databasePath + "usuarios/" + data.user_id));
          if (snapshot_1.exists()) {
            list.push({...data, nombre:snapshot_1.val().nombre, foto:snapshot_1.val().foto});
            return;
          }
          return null;
      });
      await Promise.all(promise);

      const sorted = list.sort((a, b) => b.nombre - a.nombre);
      dispatch({ type: 'SET_GROUP_MEMBERS', payload: sorted});
    } else {
      dispatch({ type: 'SET_GROUP_MEMBERS', payload: []});
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const updateGroup = async (dispatch, groupid, data, endGroup) => {
  update(ref(database, databasePath + "grupos/" + groupid), data)
  .then(() => {
    endGroup();
  })
  .catch((error) => console.error("Error write db:", error));
};

export const removeGroup = async (key, endGroup) => {
  remove(ref(database, databasePath + "grupos/" + key))
  .then(() => {
    endGroup();
  })
  .catch((error) => console.error("Error write db:", error));
};

export const removeMember = async (dispatch, key, group) => {
  remove(ref(database, databasePath + "usuarios_grupos/" + key))
  .then(() => {
    getGroupMembers(dispatch, group);
  })
  .catch((error) => console.error("Error write db:", error));
};



export const addPost = async (dispatch, data, image, groupId, endPost) => {
  set(ref(database, databasePath + "posts/" + data.id), data)
  .then(() => {
    setImagen(image, data.image, endPost, '');
  })
  .catch((error) => console.error("Error write db:", error));
};

export const getGroupPosts = async (dispatch, groupid) => {
  try {
    const datos = query(ref(database, databasePath + "posts/"), orderByChild("groupid"), equalTo(groupid));
    const snapshot = await get(datos);

    if (snapshot.exists()) {
      let objs = snapshot.val();
      var groups = [];
      var list = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        groups.push(obj);
      });

      const promise = groups.map(async (data) => {
        const snapshot_1 = await get(ref(database, databasePath + "usuarios/" + data.user_id));
          if (snapshot_1.exists()) {
            list.push({...data, usuario:snapshot_1.val().usuario, foto:snapshot_1.val().foto});
            return;
          }
          return null;
      });
      await Promise.all(promise);

      const sorted = list.sort((a, b) => b.timestamp - a.timestamp);
      dispatch({ type: 'SET_POSTS', payload: sorted});
    } else {
      dispatch({ type: 'SET_POSTS', payload: []});
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getImagePost = async (groupid, setimage) => {
  try {
    const data = query(ref(database, databasePath + "posts/"), orderByChild("groupid"), equalTo(groupid));
    const snapshot = await get(data);

    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];
      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });
      const sorted = arr.sort((a, b) => b.timestamp - a.timestamp);
      setimage(sorted[0].image, parseInt(arr.length));
    }

  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getUserPosts = async (dispatch, user_id) => {
  try {
    const data = query(ref(database, databasePath + "posts/"), orderByChild("user_id"), equalTo(user_id));
    const snapshot = await get(data);

    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });

      const sorted = arr.sort((a, b) => b.timestamp - a.timestamp);
      dispatch({ type: 'SET_USER_POSTS', payload: sorted});
    } else {
      dispatch({ type: 'SET_USER_POSTS', payload: []});
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const removePost = async (dispatch, key, user_id) => {
  remove(ref(database, databasePath + "posts/" + key))
  .then(() => {
    getUserPosts(dispatch, user_id);
  })
  .catch((error) => console.error("Error write db:", error));
};

export const updatePost = async (dispatch, post_id, data, getPosts) => {
  update(ref(database, databasePath + "posts/" + post_id), data )
  .then(() => {
    getPosts();
  })
  .catch((error) => console.error("Error write db:", error));
};




export const getPostFavs = async (post_id, setFavs) => {
  try {
    const snapshot = await get(query(ref(database, databasePath + "usuarios_favs/"), orderByChild("post_id"), equalTo(post_id)));
    let count = 0;
    if (snapshot.exists()) {
      snapshot.forEach(() => {
        count++;
      });
    }
    setFavs(count);
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getPostCommentsCount = async (post_id, setComents) => {
  try {
    const snapshot = await get(query(ref(database, databasePath + "usuarios_coments/"), orderByChild("post_id"), equalTo(post_id)));
    let count = 0;
    let data = [];
    if (snapshot.exists()) {
      snapshot.forEach(() => {
        count++;
      });
    }
    setComents(count, data);
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getPostComments = async (dispatch, post_id, setComents) => {
  try {
    const data = query(ref(database, databasePath + "usuarios_coments/"), orderByChild("post_id"), equalTo(post_id));
    const snapshot = await get(data);
    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];
      var list = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });

      const promise = arr.map(async (data) => {
        const snapshot_1 = await get(ref(database, databasePath + "usuarios/" + data.user_id));
          if (snapshot_1.exists()) {
            list.push({...data, nombre:snapshot_1.val().nombre, foto:snapshot_1.val().foto});
            return;
          }
          return null;
      });
      await Promise.all(promise);

      const sorted = list.sort((a, b) => b.timestamp - a.timestamp);
      setComents(sorted);
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getUserFavs = async (dispatch, user_id) => {
  try {
    const data = query(ref(database, databasePath + "usuarios_favs/"), orderByChild("user_id"), equalTo(user_id));
    const snapshot = await get(data);

    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];
      var list = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });

      const promise = arr.map(async (data) => {
        const snapshot_1 = await get(ref(database, databasePath + "posts/" + data.post_id));
          if (snapshot_1.exists()) {
            list.push({...data, ...snapshot_1.val()});
            return;
          }
          return null;
      });
      await Promise.all(promise);

      const sorted = list.sort((a, b) => b.timestamp - a.timestamp);
      dispatch({ type: 'SET_USER_FAVS', payload: sorted});
    } else {
      dispatch({ type: 'SET_USER_FAVS', payload: []});
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const setFav = async (dispatch, id, data, getFavs) => {
  set(ref(database, databasePath + "usuarios_favs/" + id), data)
  .then(() => { getFavs(); })
  .catch((error) => console.error("Error write db:", error));
};

export const removeFav = async (dispatch, key, user_id, getFavs) => {
  remove(ref(database, databasePath + "usuarios_favs/" + key))
  .then(() => {
    getUserFavs(dispatch, user_id);
    getFavs();
  })
  .catch((error) => console.error("Error write db:", error));
};


export const addComment = async (dispatch, data, getComments) => {
  set(ref(database, databasePath + "usuarios_coments/" + data.id), data)
  .then(() => {
    getComments();
  })
  .catch((error) => console.error("Error write db:", error));
};



export const setImagen = async (uri, name, endPost, user_id) => {
  if(uri == ''){return;}
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const stRef = storageRef(storage, name);
    await uploadBytes(stRef, blob);
    endPost(true, user_id);
  } catch (err) {
    console.error('Error subiendo la imagen:', err);
  }
};



/*
export const setUser = async (dispatch, userid, datos, cerrar) => {
  setLoading(dispatch, true);
  try {
    await set(ref(database, databasePath + "admin/usuarios/" + userid), datos);
    dispatch({ type: 'SET_USER', payload: datos});
    setLoading(dispatch, false);
    cerrar("Actualizado con éxito");
  } catch (error) {
    console.error("Error write db:", error);
    setLoading(dispatch, false);
    cerrar("Error al actualizar");
  }
};



export const deleteAccount = async (dispatch, user_id, credentials, salir) => {
  setLoading(dispatch, true);
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(credentials.email, credentials.password);

  if (user) {
    try {
      const deleteUser = httpsCallable(getFunctions(), "deleteUser");
      const { data } = await deleteUser({ 
        dbPath: databasePath,
        user_id: user_id,
      });

      if (data.message == 'successful') {
        await reauthenticateWithCredential(user, credential);
        await user.delete();
        dispatch({ type: 'SET_USER_AUTH', payload: false });
        dispatch({ type: 'SET_USER', payload: {user_id: ''} });
        Alert.alert( 'Mi Cuenta', "Cuenta eliminada exitosamente");
        salir();
      }
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error.message);
    }
    setLoading(dispatch, false);
  } else {
    console.log("No hay usuario autenticado");
    Alert.alert( 'Mi Cuenta', "No se pudo eliminar la cuenta, por favor cierra sesión, e ingresa nuevamante.");
    setLoading(dispatch, false);
  }
};



export const getNegocios = async (dispatch, user_id) => {
  setLoading(dispatch, true);
  try {
    const snapshot = await get(child(ref(database), databasePath + "negocios"));
    if (snapshot.exists()) {

      let objs = snapshot.val();
      var arr = [];
      objs.forEach((doc) => {
        arr.push(doc);
      });

      dispatch({ type: 'SET_NEGOCIOS', payload: arr});
    } else {
      dispatch({ type: 'SET_NEGOCIOS', payload: []});
    }

    setLoading(dispatch, false);
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getCategorias = async (dispatch, negocio, ruta) => {
  setLoading(dispatch, true);
  try {
    const categorias = query(ref(database, databasePath + ruta), orderByChild("negocio"), equalTo(negocio));
    const snapshot = await get(categorias);

    if (snapshot.exists()) {
      let objs = snapshot.val();
      var arr = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        arr.push(obj);
      });

      dispatch({ type: 'SET_CATEGORIAS', payload: arr});
    } else {
      dispatch({ type: 'SET_CATEGORIAS', payload: []});
    }

    setLoading(dispatch, false);
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};

export const getCategoriaData = async (dispatch, ruta, id) => {
  setLoading(dispatch, true);
  try {
    const snapshot = await get(child(ref(database), databasePath + ruta + "/" + id));

    if (snapshot.exists()) {
      let objs = snapshot.val();
      objs.key = snapshot.key;
      console.log(snapshot.key)

    }

    setLoading(dispatch, false);
  } catch (error) {
    console.error("Error al leer datos:", error);
    setLoading(dispatch, false);
  }
};



export const setDatosValores = async (dispatch, datos, negocios, tipo, showAlert) => {
  setLoading(dispatch, true);

  try {
    await set(ref(database, databasePath + tipo + "_datos"), datos);
    await set(ref(database, databasePath + "negocios"), negocios);
    setLoading(dispatch, false);
    showAlert("Archivo "+tipo+" cargado con éxito");
  } catch (error) {
    console.error("Error write db:", error);
    setLoading(dispatch, false);
    showAlert("Error cargado el archivo");
  }
};



export const getFavoritos = async (dispatch, user_id) => {
  try {
    const snapshot = await get(child(ref(database), databasePath + "admin/favoritos/" + user_id));
    if (snapshot.exists()) {

      let objs = snapshot.val();
      var datos = [];

      Object.entries(objs).forEach(([key, value]) => {
        let obj = value;
        obj.key = key
        datos.push(obj);
      });

      dispatch({ type: 'SET_FAVORITOS', payload: datos});
    } else {
      dispatch({ type: 'SET_FAVORITOS', payload: []});
    }
  } catch (error) {
    console.error("Error al leer datos:", error);
  }
};




*/