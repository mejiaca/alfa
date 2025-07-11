import React, {useEffect, useState, useContext} from "react";
import { TouchableOpacity,  StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppContext } from '../context/State';
import { setFav, removeFav } from '../context/Actions';


const BotonLike = ({ id }) => {
    const { dispatch, user, userFavs } = useContext(AppContext);
    const [like, setLike] = useState(false); 
    const [key, setKey] = useState(false); 

    useEffect(() => {
        setLike(false);
        userFavs.map((item) => {
            if(id == item.id){
                setLike(true);
                setKey(item.key);
            }
        });
    }, [userFavs]);

    const likeContent = () => {
        const uniqueId = user.user_id+'_'+Date.now();
        if(!like){
            let data = {
                post_id: id,
                user_id: user.user_id,
                estado:'like',
            }
            setLike(true);
            setFav(dispatch, uniqueId, data);
        }else{
            setLike(false);
            removeFav(dispatch, key, user.user_id);
        }
    };

    return (
        <TouchableOpacity onPress={likeContent} style={styles.actionButton} >
            <AntDesign name={like ? "heart" : "hearto"} size={25} color="rgba(28, 28, 28, 0.8)" />
        </TouchableOpacity>
    );
};

export default BotonLike;


const styles = StyleSheet.create({
    actionButton: {
        marginRight: 15,
        padding: 5,
    },
    container: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        width:40,
        height:40,
        backgroundColor:'rgba(130, 130, 130, 0.2)',
    },
});
