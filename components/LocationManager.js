import React from 'react'
import { Pressable } from 'react-native'
import { Text, View } from 'react-native'
import PressableButton from './PressableButton'
import * as Location from 'expo-location';
import { useState } from 'react';
import {mapAPIkey,apiKey} from "@env";
import { Image } from 'react-native';



function LocationManager(props) {
    const [status, requestPermission] = Location.useForegroundPermissions();
    // an object that implements LocationPermissionResponse interface and 
    // an async function to request permission.

    const [location, setLocation] = useState(null);
    const [mapURL, setMapURL] = useState(null);


    const jumpToMap = () => {
        //console.log('jump to map');
        props.navigation.navigate('Map');
    }
    const vefifyPermissions = async() => {
        if(status.granted === true) {
            return true;
        }
        else{
            const permission = await requestPermission();
            //console.log('location permission',permission);
            return permission.granted;
        }
    }

    const locateUserHandler = async () => {
        try {
            if(vefifyPermissions()){
                const location = await Location. getCurrentPositionAsync();
                console.log('location',location);
                setLocation(location);
                setMapURL( `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapAPIkey}`);
            }
            else{
                alert('Permission to access location was denied');
            }
        }
        catch (err) {
            console.log('error occurs in location manager component',err);
        }
      };


     
  return (
    <View style={{flex:0}}>
        <PressableButton pressedFunction={locateUserHandler}>
            <Text>Get My Location</Text>
        </PressableButton>

        <PressableButton pressedFunction={jumpToMap}>
            <Text>Go to Map Screen</Text>
        </PressableButton>
        
        {location?<View style={{margin:10}}>
        <Text>location:</Text>
        <Text>Altitude:{location.coords.altitude}</Text>
        <Text>Longitude:{location.coords.longitude}</Text>
        
        <View style={{margin:10,alignSelf:'center'}}>
        <Image source={{uri:mapURL,width:300,height:300}}/>
        </View>

        </View>
        :<View></View>}
    </View>
  )
}

export default LocationManager
