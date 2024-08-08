import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import { useState } from 'react';
import PressableButton from './PressableButton';
import { Button } from 'react-native';

function Map({navigation,route}) {
    const [selectedLocation, setSelectedLocation] = useState(
        // {
        // latitude: 49.281348881743014,
        // longitude: -123.11445562981213,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        // }
);
    function handleGoToProfile() {
        //console.log('go to profile,location selected is: ',selectedLocation);
        navigation.navigate('Profile',{selectedLocation:selectedLocation});
        
    }

    return (
        <View style={{ flex: 1, margin: 10}}>
            
            <MapView
                style={{ flex: 4, height: 300, width: 350 }}
                initialRegion={{
                    latitude: 49.2813,
                    longitude: -123.1144,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(event) => {
                    console.log('event', event.nativeEvent)
                    setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude,
                    });
                }}
            >
                {selectedLocation?<Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />:null}
            </MapView>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={handleGoToProfile} disabled={!selectedLocation}
                    title='Go Back to Profile'
                />
            </View>
        </View>
    );
}

export default Map;
