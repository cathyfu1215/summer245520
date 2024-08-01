import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';

function Profile() {
  return (
    <View>
        <Text style={{margin:10}}>Email:{auth.currentUser.email}</Text>
        <Text style={{margin:10}}>UID:{auth.currentUser.uid}</Text>
    </View>
  )
}

export default Profile
