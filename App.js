import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { TextInput } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const appName = 'Cathy\'s summer project';
  const[text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Header name = {appName} theme="dark">
      </Header>
      <Text>Welcome to {appName}(I am a text)</Text>
      <TextInput 
      style={{height:40}}
      placeholder="Enter something here..."
      onChangeText={newText => setText(newText)}
      value={text}
      autoCapitalize={true}
       />
       <Text>your input is: {text}</Text>
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
