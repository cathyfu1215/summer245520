import React from 'react'
import MapView from "react-native-maps";
import {Text, View } from 'react-native';


function Map() {
  return (
   <View>
    <Text>map</Text>
    <MapView style={{flex:1}}/>
   </View>
  )
}

export default Map
