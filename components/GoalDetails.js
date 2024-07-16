import React from 'react'
import { View, Text } from 'react-native';

function GoalDetails(props) {
 
  // access route.parames to get the data passed from the previous screen
  return (
    <View>
        <Text>ID: {props.route.params.id}</Text>
        <Text>Text: {props.route.params.text}</Text>
        
    </View>
  )
}

export default GoalDetails