import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';
import LocationManager from './LocationManager';
import { ScrollView } from 'react-native';

function Profile(props) {
  //console.log(props.route.params);
  return (
    <ScrollView>
        <Text style={{margin:10}}>Email:{auth.currentUser.email}</Text>
        <Text style={{margin:10}}>UID:{auth.currentUser.uid}</Text>
        <LocationManager navigation={props.navigation} route={props.route}/>
    </ScrollView>
  )
}

export default Profile
