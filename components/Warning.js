import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { styleHelper } from '../styleHelper';
import PressableButton from './PressableButton';


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
        <PressableButton pressedFunction={handleWarning}>
          <Text style={styleHelper.warningButtonStyle}>Warning</Text>
        </PressableButton>

    </View>
  )
}

export default Warning