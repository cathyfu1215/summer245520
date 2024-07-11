import { View, Text, Button, Modal } from 'react-native'
import React from 'react'
import { TextInput,StyleSheet } from 'react-native';
import  { useState } from 'react';
import { Image } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 100,
  },
  textStyle: {
    fontSize: 20,
    color: 'purple'
  },
  buttonStyle: {
    width:"30%",
    margin:10,
    padding:10,
    flexDirection:'row',
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  
    
  },
});

const Input = (props) => {
  const[text, setText] = useState('');
  const [confirmButtonEnabled, setConfirmButtonEnabled] = useState(false);
  const [focused, setFocused] = useState(props.focused);
  const [loseFocusMessage, setLoseFocusMessage] = useState('');

  const handleBlur = () => {
    setFocused(false);
    setLoseFocusMessage(props.message);
  };

  const handleFocus = () => {
    setFocused(true);
    setLoseFocusMessage('');
    setConfirmButtonEnabled(true);
  };

  const handleConfirm = () => {
   
    props.handleInputData(text);
    props.handleModalNotVisible();
    setText('');
  };

  const handleCancel = () => {
    props.handleModalNotVisible();
    setText('');
  };

  return (
    
    <Modal animationType='slide' visible={props.modalVisible} transparent={true} >
    
    <View style={styles.container}>
    <View style={styles.centerContainer}>
    
    <Image style={styles.imageStyle} alt='a target image' source={{
  uri:'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'}} /> 
     <Image style={styles.imageStyle} alt='a target image' 
            source={require('../assets/2617812.png')} />
      <TextInput 
        style={{height:40}}
        placeholder="Type Something here..."
        onChangeText={newText => setText(newText)}
        value={text}
        autoFocus={focused}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <Text style={styles.textStyle}>your input is: {text}</Text>
      <Text>{loseFocusMessage}</Text>
      <View style={{flexDirection: 'row'}}>
      <View style={styles.buttonStyle}>
        <Button title='cancel' onPress={handleCancel}/>
      </View>
      <View style={styles.buttonStyle}>
        <Button title='confirm' onPress={handleConfirm} disabled={!confirmButtonEnabled}/>
      </View>
      
      </View>
      
    </View>
    </View>
    </Modal>
    
  )
}





export default Input