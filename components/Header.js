import { View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {
    console.log(props);
  return (
    <View>
      <Text style={{backgroundColor:"pink"}}>Welcome to {props.name}</Text>
      {props.children}
    </View>
  )
}