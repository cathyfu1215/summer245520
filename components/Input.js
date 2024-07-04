import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import React, { useState } from 'react';

const Input = () => {
  const[text, setText] = useState('');
  const[password, setPassword] = useState('');
  return (
    <View>
      <Text>Input</Text>
      <TextInput 
        style={{height:40}}
        placeholder="Enter something here..."
        onChangeText={newText => setText(newText)}
        value={text}
        autoCapitalize={true}
      />
      <Text>your input is: {text}</Text>
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