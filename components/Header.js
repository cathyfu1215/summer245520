import { View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {
  return (
    <View>
    <View style={{borderRadius: 20}}>
      <Text style={{padding:10, fontSize:22, 
                   backgroundColor:"lightblue", borderColor:'gold', 
                   borderWidth:2, padding: 5, margin:5}}>
                    Welcome to {props.name}</Text>
      {props.children}
    </View>
    </View>
  )
}