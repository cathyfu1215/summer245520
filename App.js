import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import Header from './components/Header';
import React, { useState } from 'react';
import Input from './components/Input';
import { SafeAreaView } from 'react-native';



export default function App() {
  const [goals,setGoals] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const appName = 'Cathy\'s summer project';

  //to receive data
  function handleInputData(data){
    console.log('data we got(the username):',data);
    //setReceivedText(receivedText.concat(data));

    //define a new object{text:data, id:random number}
    const newGoal = {text:data, id:Math.random()};
    const newArray = [...goals, newGoal];

    
    setGoals((goals)=>{
      return [...goals, newGoal]
    });

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
      <Input focused = {true} message='Thank you for entering the input' handleInputData={handleInputData}
             modalVisible={modalVisible} handleModalNotVisible={handleModalNotVisible}/>
      <View style={styles.bottomContainer}>
      <Text style={styles.textStyle}>Your Goals:</Text>
      {goals.map((goal)=>{
        return <Text key={goal.id} style={styles.textStyle}>{goal.text}</Text>
      })}
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
    color: 'darkblue',
    marginVertical:5,
    padding:5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
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
