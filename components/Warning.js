import React from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native';

function Warning(props) {
  function handleWarning(){
    props.navigation.setOptions({title:'Warning',headerStyle: {
      backgroundColor: 'red',
    },});
  }


  return (
    <View>
        <Button title='Warning' onPress={handleWarning}/>
    </View>
  )
}

export default Warning