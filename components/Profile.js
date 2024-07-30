import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../Firebase/firebaseSetup';

function Profile() {
  return (
    <View>
        <Text>Email:{auth.currentUser.email}</Text>
        <Text>UID:{auth.currentUser.uid}</Text>
    </View>
  )
}

export default Profile
