/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
const Reducers = (state, action) => {
  switch (action.type) {
    case "SET_LOADING": return {  ...state, isLoading: action.payload };
    case "SET_USER_AUTH": return { ...state, isAuth: action.payload };
    case "SET_USER": return { ...state, user: action.payload };
    case "SET_CHART_MODAL": return { ...state, isChartModal: action.payload };
    case "SET_TEMA": return { ...state, tema: action.payload };

    case "SET_USER_GROUPS": return { ...state, userGroups: action.payload };
    case "SET_USER_POSTS": return { ...state, userPosts: action.payload };
    case "SET_USER_FAVS": return { ...state, userFavs: action.payload };
    
    case "SET_POSTS": return { ...state, posts: action.payload };
    
    case "SET_GROUP_INFO": return { ...state, groupInfo: action.payload };
    case "SET_GROUP_MEMBERS": return { ...state, participantes: action.payload };


    

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
        message: action.payload.message
      };

    default:
      return state;
  }
};
export default Reducers;