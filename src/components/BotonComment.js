import React, {useEffect, useState, useContext} from "react";
import { TouchableOpacity,  StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ModalDialogo from './ModalDialogo';
import { AppContext } from '../context/State';


const BotonComment = ({ id, getComments, commentsCount }) => {
    const { dispatch, user, userFavs } = useContext(AppContext);
    const [modalDialogo, setModalDialogo] = useState(false);

    const commentDialog = () => {
        setModalDialogo(true);
    };    

    return (
    <>
        <View  style={styles.container} >
            <TouchableOpacity onPress={commentDialog} style={styles.actionButton} >
                <AntDesign name={"message1"} size={25} color="rgba(28, 28, 28, 0.8)" />
            </TouchableOpacity>

            {commentsCount > 0 && (
                <View style={styles.actionText} >
                    <Text style={styles.likesText}>{commentsCount}</Text>
                </View>
            )} 
        </View>

        <ModalDialogo 
            tipo={'comment'}
            title={'Agregar comentario'}
            modalVisible={modalDialogo} 
            setModalVisible={setModalDialogo}
            post_id={id}
            getComments={getComments}
        />
    </>
    );
};

export default BotonComment;


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
        paddingRight:25,
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
