import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { styleHelper } from '../styleHelper';


function Warning(props) {
  function handleWarning(){
    props.navigation.setOptions({title:'Warning',headerStyle: {
      backgroundColor: 'red',
    },});
    
    props.navigation.navigate('Details',{text:props.route.params.text, 
      id:props.route.params.id, isWarning:true});
  }


  return (
    <View>
        <Pressable onPress={handleWarning}>
        <Text style={styleHelper.warningButtonStyle}>Warning</Text>
        </Pressable>
    </View>
  )
}

export default Warning