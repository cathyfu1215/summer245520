import React, { useEffect, useState } from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import PressableButton from './PressableButton';
import * as Location from 'expo-location';
import { mapAPIkey } from "@env";
import {Dimensions} from 'react-native';



function LocationManager({ navigation, route }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    //console.log('route params in location manager:', route.params);    
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    const [mapURL, setMapURL] = useState(null);

    useEffect(() => {
        if (route.params && route.params.selectedLocation) {
            console.log('selected location passed from map:', route.params.selectedLocation);
            setLocation(route.params.selectedLocation);
            setMapURL(`https://maps.googleapis.com/maps/api/staticmap?center=${route.params.selectedLocation.latitude},${route.params.selectedLocation.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${route.params.selectedLocation.latitude},${route.params.selectedLocation.longitude}&key=${mapAPIkey}`);
        }
    }, [route.params]);

    const jumpToMap = () => {
        navigation.navigate('Map');
    };

    const verifyPermissions = async () => {
        if (status.granted) {
            return true;
        } else {
            const permission = await requestPermission();
            return permission.granted;
        }
    };

    const locateUserHandler = async () => {
        try {
            if (await verifyPermissions()) {
                const location = await Location.getCurrentPositionAsync();
                console.log('location', location);
                setLocation(location);
                setMapURL(`https://maps.googleapis.com/maps/api/staticmap?center=${location.coords.latitude},${location.coords.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.coords.latitude},${location.coords.longitude}&key=${mapAPIkey}`);
            } else {
                alert('Permission to access location was denied');
            }
        } catch (err) {
            console.log('error occurs in location manager component', err);
        }
    };

    return (
        <View style={{ flex: 0 }}>
            <PressableButton pressedFunction={locateUserHandler}>
                <Text>Get My Location</Text>
            </PressableButton>

            <PressableButton pressedFunction={jumpToMap}>
                <Text>Go to Map Screen</Text>
            </PressableButton>

            {location ? (
                <View style={{ margin: 10 }}>
                    <View style={{ margin: 10, alignSelf: 'center' }}>
                        <Image source={{ uri: mapURL, width: 0.8*windowWidth, height: 0.5*windowHeight }} />
                    </View>
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
}

export default LocationManager;
