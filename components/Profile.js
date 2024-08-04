import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import LocationManager from './LocationManager';

function Profile(props) {
  return (
    <View>
        <Text style={{margin:10}}>Email:{auth.currentUser.email}</Text>
        <Text style={{margin:10}}>UID:{auth.currentUser.uid}</Text>
        <LocationManager navigation={props.navigation} route={props.route}/>
    </View>
  )
}

export default Profile
