import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import PressableButton  from './PressableButton';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';
import { useState } from 'react';



function ImageManager() {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageURI, setImageURI] = useState(null);
  
    const vefifyPermissions = async() => {
        if(status.granted === true) {
            return true;
        }
        else{
            return await requestPermission();
            
        }
       
    }

    const takeImageHandler = async () => {
       

        try {
            vefifyPermissions();
            const result = await ImagePicker.launchCameraAsync({});
            console.log('result from camera',result);
            if (!result.canceled) {
                console.log('photo uri',result.assets[0].uri);
                setImageURI(result.assets[0].uri);
            }
        }
        catch (err) {
            console.log(err);
            alert('An error occurred', err.message, [{ text: 'Okay' }]);
        }
      };
    
  return (
    <View>
        <PressableButton pressedFunction={takeImageHandler}>
        <Feather name="camera" size={24} color="black" />
        </PressableButton>
        <Image style={{height:100,width:100}}source={{uri: imageURI}}/>
    </View>
  )
}

export default ImageManager
