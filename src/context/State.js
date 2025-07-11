/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, { createContext, useReducer } from 'react';
import Reducers from './Reducers'

const initialState = {
    isAuth: false,
    isAuthLoading: false,
    isLoading: true,
    isChartModal: false,

    storagePath: 'https://storage.googleapis.com/levapangallery.firebasestorage.app/',

    //testdevelop
    version: '1.0.1',
    
    user: {},
    userGroups:'',
    posts:[],
    userPosts:[],
    userFavs:[],
    participantes:[],

    groupInfo:[],
}

export const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducers, initialState);
    return (
        <AppContext.Provider value={{
            isAuth: state.isAuth,
            isAuthLoading: state.isAuthLoading,
            isLoading: state.isLoading,
            isChartModal: state.isChartModal,
            version: state.version,
            storagePath: state.storagePath,
            
            user: state.user,
            userGroups: state.userGroups,
            posts: state.posts,
            userPosts: state.userPosts,
            userFavs: state.userFavs,
            participantes: state.participantes,

            groupInfo: state.groupInfo,     

            state: state,
            dispatch: dispatch
        }}>
            {children}
        </AppContext.Provider>
    );
}