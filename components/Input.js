import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import  { useState } from 'react';

const Input = (props) => {
  const[text, setText] = useState('');
  const[password, setPassword] = useState('');

  const [focused, setFocused] = useState(props.focused);
  const [loseFocusMessage, setLoseFocusMessage] = useState('');

  const handleBlur = () => {
    setFocused(false);
    setLoseFocusMessage(props.message);
  };

  const handleFocus = () => {
    setFocused(true);
    setLoseFocusMessage('');
  };

  return (
    <View>
      <Text>Input block</Text>
      <TextInput 
        style={{height:40}}
        placeholder="Enter something here..."
        onChangeText={newText => setText(newText)}
        value={text}
        autoFocus={focused}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <Text>your input is: {text}</Text>
      <Text>{loseFocusMessage}</Text>

      <Text>Your password:</Text>
      <TextInput 
        style={{height:40}}
        placeholder="Enter password..."
        onChangeText={newText => setPassword(`*`.repeat(newText.length))}
        value={password}
      />
    </View>
  )
}

export default Input