import { View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {
    console.log(props);
  return (
    <View>
    <View style={{borderRadius: 20}}>
      <Text style={{padding:10, fontSize:22, backgroundColor:"pink", borderColor:'purple', borderWidth:2}}>Welcome to {props.name}</Text>
      {props.children}
    </View>
    </View>
  )
}