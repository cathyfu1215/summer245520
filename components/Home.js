import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { writeToDB } from '../Firebase/firestoreHelper';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';
import { deleteFromDB } from '../Firebase/firestoreHelper';



function Home(props) {

  const [goals,setGoals] = useState([]); 


  // useEffect uses a function and a dependency array
  // onSnapshot is a listener that listens to the changes in the database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      const goals = [];
      querySnapshot.forEach((doc) => {
        goals.push({...doc.data(), id: doc.id}); //spread it and add id(key-value)
      });
      setGoals(goals);
    })
    //Q2 in Lab4, clear up, I learned this from Copilot
    return () => {
      unsubscribe();
    };
  }, []);



    
    const [modalVisible, setModalVisible] = useState(false);
    const appName = 'Cathy\'s Goal Tracker';
  
    
    function handleInputData(data){
  
       const newGoal = {text:data};  
      // writeToDB(newGoal);
      // using the generalized function
      writeToDB(newGoal, "goals");
  
    }
  
    function handleModalVisible(){
      setModalVisible(true);
    }
  
    function handleModalNotVisible(){
      setModalVisible(false);
    }
  
    function handleDeleteGoal(id){

      //deleteFromDB(id);
      deleteFromDB(id, "goals");

    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Header name = {appName} theme="dark"/>
      <View style={styles.buttonStyle}>
        {/* <View style={{alignItems:'center',flexDirection:'row'}}> */}
      {/* <Button title="Sign up" onPress={()=>props.navigation.navigate('Signup')}/>
      <Button title="Login" onPress={()=>props.navigation.navigate('Login')}/> */}
        {/* </View> */}
      <Button title="Add a goal" onPress={handleModalVisible}/>
      </View>
      </View>
      <Input focused = {true} message='Thank you for entering the input' handleInputData={handleInputData}
             modalVisible={modalVisible} handleModalNotVisible={handleModalNotVisible}/>
      <View style={styles.bottomContainer}>
      
      <Text style={styles.textStyle}>Your Goals:</Text>
      
       {goals.length === 0 ? <Text>Please enter goals...</Text>:null}
      
      
      {/*<ScrollView>
      {goals.map((goal)=>{
        return <View key={goal.id} style={{borderRadius: 10 ,borderWidth: 2, borderColor: 'lightgrey'}}><Text style={styles.textStyle}>{goal.text}</Text></View>
      })}
      </ScrollView>
      
      } */}

      <FlatList 
      renderItem={({item})=>{
        return <GoalItem item={item} handleDeleteGoal={handleDeleteGoal} 
        navigation={props.navigation} route={props.route}/>
      }}
      data={goals}/>
      
     
      
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
      flex:2,
      backgroundColor: 'lightgreen',
      alignItems: 'center',
  
    },
    bottomContainer:{
      flex:5,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      rowGap: 5,
  
    }
  });
  
export default Home