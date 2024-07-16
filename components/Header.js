import { View, Text } from 'react-native'
import React from 'react'
import { styleHelper } from '../styleHelper'

export default function Header(props) {
  return (
    <View>
    <View style={{borderRadius: 20}}>
      <Text style={styleHelper.headerCompStyle}>
                    Welcome to {props.name}</Text>
      {props.children}
    </View>
    </View>
  )
}