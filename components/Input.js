import { View, Text, Button, Modal } from 'react-native'
import React from 'react'
import { TextInput,StyleSheet } from 'react-native';
import  { useState } from 'react';

const Input = (props) => {
  const[text, setText] = useState('');

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

  const handleConfirm = () => {
    console.log(text);
    // call the received callback function
    props.handleInputData(text);
    props.handleModalNotVisible();
    setText('');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Modal animationType='slide' visible={props.modalVisible}>
    <View style={styles.container}>
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

      <Button title='confirm' onPress={handleConfirm}/>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Input