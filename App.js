import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { TextInput } from 'react-native';
import React, { useState } from 'react';
import Input from './components/Input';

export default function App() {
  const [receivedText,setReceivedText] = useState(''); 
  const appName = 'Cathy\'s summer project';

  //to receive data
  function handleInputData(data){
    console.log('data we got(the username):',data);
    setReceivedText(data);
  }

  return (
    <View style={styles.container}>
      <Header name = {appName} theme="dark"/>
      <Input focused = {true} message='Thank you' handleInputData={handleInputData}/>
       <Text>Hello, {receivedText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
