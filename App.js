import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import Header from './components/Header';
import React, { useState } from 'react';
import Input from './components/Input';
import { SafeAreaView } from 'react-native';


export default function App() {
  const [receivedText,setReceivedText] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const appName = 'Cathy\'s summer project - lab2';

  //to receive data
  function handleInputData(data){
    console.log('data we got(the username):',data);
    setReceivedText(data);
  }

  function handleModalVisible(){
    setModalVisible(true);
  }

  function handleModalNotVisible(){
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Header name = {appName} theme="dark"/>
      <View style={styles.buttonStyle}>
      <Button title="Add a goal" onPress={handleModalVisible}/>
      </View>
      </View>
      <Input focused = {true} message='Thank you' handleInputData={handleInputData}
             modalVisible={modalVisible} handleModalNotVisible={handleModalNotVisible}/>
      <View style={styles.bottomContainer}>
      <Text>{receivedText}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width:"30%",
    margin:10
  },
  textStyle: {
    fontSize: 20,
    color: 'darkblue'
  },
  topContainer:{
    flex:1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',

  },
  bottomContainer:{
    flex:4,
    backgroundColor: 'lightblue',
    alignItems: 'center',

  }
});
