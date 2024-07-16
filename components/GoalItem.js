import React from 'react'
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native'




function GoalItem(props) {

  function handleInformation(){
    // navigation.navigate(name, params)
    props.navigation.navigate('Details',{text:props.item.text, id:props.item.id});
    //wrap the buttons in a view to style them
  }
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textStyle}>{props.item.text}</Text>
        <Button color='grey' onPress={() => props.handleDeleteGoal(props.item.id)} title="x"/>
        <Button color='grey' onPress={handleInformation} title="i"/>
      </View>
    )
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
      width:"30%",
      margin:10
    },
    textStyle: {
      fontSize: 15,
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
  
    },
    itemContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      padding: 10,
      backgroundColor: 'lightgrey',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'lightgrey'
    }
  });
  

export default GoalItem