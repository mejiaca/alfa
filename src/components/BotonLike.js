import React, {useEffect, useState, useContext} from "react";
import { TouchableOpacity,  StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppContext } from '../context/State';
import { setFav, removeFav } from '../context/Actions';


const BotonLike = ({ id, getFavs, likesCount }) => {
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
            setFav(dispatch, uniqueId, data, getFavs);
        }else{
            setLike(false);
            removeFav(dispatch, key, user.user_id, getFavs);
        }
    };

    const likeList = () => {

    };
    

    return (
        <View  style={styles.container} >
            <TouchableOpacity onPress={likeContent} style={styles.actionButton} >
                <AntDesign name={like ? "heart" : "hearto"} size={25} color="rgba(28, 28, 28, 0.8)" />
            </TouchableOpacity>

            {likesCount > 0 && (
                <TouchableOpacity onPress={likeList} style={styles.actionText} >
                    <Text style={styles.likesText}>{likesCount}</Text>
                </TouchableOpacity>
            )} 
        </View>
    );
};

export default BotonLike;


const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        flexDirection:'row',
        paddingRight:10
    },
    actionButton: {
        paddingRight:10,
        paddingVertical:5,
        // backgroundColor:'gray',
    },
    actionText: {
        paddingRight:15,
        paddingVertical:10,
        // backgroundColor:'gray',
    },
    likesText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        // marginLeft:5
    },
});
