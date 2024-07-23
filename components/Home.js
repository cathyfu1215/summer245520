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


  //useEffect uses a function and a dependency array
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
      // setGoals((goals)=>{
      //   return [...goals, newGoal]
      // });

       writeToDB(newGoal);
  
    }
  
    function handleModalVisible(){
      setModalVisible(true);
    }
  
    function handleModalNotVisible(){
      setModalVisible(false);
    }
  
    function handleDeleteGoal(id){
      // console.log('goal deleted',id);
      // newArray = goals.filter((goal)=>{
      //   return goal.id !== id;
      // });
      // setGoals(newArray);
      deleteFromDB(id);

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
      flex:1,
      backgroundColor: 'lightgreen',
      alignItems: 'center',
  
    },
    bottomContainer:{
      flex:4,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      rowGap: 5,
  
    }
  });
  
export default Home