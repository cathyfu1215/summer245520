import React from 'react'
import { View, Text } from 'react-native'
import PressableButton  from './PressableButton';
import * as ImagePicker from 'expo-image-picker';
import Feather from '@expo/vector-icons/Feather';



function ImageManager() {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

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
    </View>
  )
}

export default ImageManager
