import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { writeToDB } from '../Firebase/firestoreHelper';
import { useEffect } from 'react';
import { collection, onSnapshot,query,where } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';
import { deleteFromDB } from '../Firebase/firestoreHelper';
import { auth } from '../Firebase/firebaseSetup';
import {ref} from 'firebase/storage';
import {storage} from '../Firebase/firebaseSetup';
import { uploadBytesResumable } from 'firebase/storage';




function Home(props) {

  const [goals,setGoals] = useState([]); 
  const [imageURI, setImageURI] = useState(null);


  // useEffect uses a function and a dependency array
  // onSnapshot is a listener that listens to the changes in the database
  useEffect(() => {
    try {
      //console.log('current user:', auth.currentUser.uid);
      const unsubscribe = onSnapshot(
        query(collection(database, "goals"), 
        where("owner", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          const goals = [];
          querySnapshot.forEach((doc) => {
            goals.push({...doc.data(), id: doc.id}); //spread it and add id(key-value)
          });
          console.log(goals);
          setGoals(goals);
        }
      )
      //Q2 in Lab4, clear up, I learned this from Copilot
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }, []);
  
  



    
    const [modalVisible, setModalVisible] = useState(false);
    const appName = 'Cathy\'s Goal Tracker';
  
    function setupImageURI(newURI){
      setImageURI(newURI);
    }

   
    
    async function handleInputData(data){
  
      try{
       const newGoal = {text:data, owner: auth.currentUser.uid, image: imageURI};  
      // writeToDB(newGoal);
      // using the generalized function
      const response = await fetch(newGoal.image);
      const blob = await response.blob();

      const imageName = newGoal.image.substring(newGoal.image.lastIndexOf('/') + 1);
      const imageRef = await ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);

      console.log('new goal:', newGoal);
      const goal= { text:data, 
                    owner: auth.currentUser.uid, 
                    image:uploadResult.metadata.fullPath}
      writeToDB(goal, "goals");
      }
      catch(error){
        console.log('error when handling input goals in home.js:', error);
      }
  
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
             modalVisible={modalVisible} handleModalNotVisible={handleModalNotVisible}
             setupImageURI={setupImageURI}/>
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
      backgroundColor: 'white',
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