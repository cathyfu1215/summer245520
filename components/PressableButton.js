import React from 'react'
import { Pressable } from 'react-native';

function PressableButton({children, pressedFunction}) {
  return (
    <Pressable style={{backgroundColor:'lightblue',margin: 10, padding: 5, alignItems:'center'}} onPress={pressedFunction}>
        {children}
    </Pressable>
  )
}

export default PressableButton;
