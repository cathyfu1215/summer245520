import React from 'react'
import { View, Text } from 'react-native';

function GoalDetails({route}) {
 
  // access route.parames to get the data passed from the previous screen
  return (
    route.params.isWarning ? 
    <View>
        <Text style={{color:'red'}}>ID: {route.params.id}</Text>
        <Text style={{color:'red'}}>Text: {route.params.text}</Text>
        
    </View>
    :
    <View>
        <Text>ID: {route.params.id}</Text>
        <Text>Text: {route.params.text}</Text>
        
    </View>
  )
}

export default GoalDetails
