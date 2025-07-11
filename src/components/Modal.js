/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, {useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View,  TouchableOpacity} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import ModalContactos from '../components/ModalContactos';
import global from '../managers/Global';

const Modal = ({}) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState('100%');
    const [action, setAction] = useState(false);
    const [seccion, setSeccion] = useState('');

    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    useEffect(() => {
        global.events.addListener('open_modal', open);
    }, []);

    const open = (val) => {
        setSize(val.size);
        setAction(val.action);
        setSeccion(val.seccion);
        setVisible(true);
    };

    const closeModal = () => {
        sheetRef.current?.close();
    };

    return (
        <>
        {/* {visible ? ( */}
            <GestureHandlerRootView style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0,}}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeContainer} activeOpacity={1} onPress={() => sheetRef.current?.close() } />

                    <BottomSheet 
                        ref={sheetRef}
                        index={1} 
                        // snapPoints={[size, size]} 
                        snapPoints={snapPoints}
                        enablePanDownToClose={true} 
                        onClose={()=> setVisible(false)} 
                    >

                        
                        {action == 'select_animal' ? (<ModalContactos closeModal={closeModal}/>):null}

                    </BottomSheet>
                </View >
            </GestureHandlerRootView>
        {/* ) : null} */}
        </>
    )
}
  
export default Modal;

const styles = StyleSheet.create({
    container: {
        flex:1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor:'black',
        opacity:.5
    },

    closeContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'global.color.gray8',
    },

    contentContainer: {
        paddingHorizontal:20,
    },
});