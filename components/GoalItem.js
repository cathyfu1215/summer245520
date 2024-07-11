import React from 'react'
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native'




function GoalItem(props) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textStyle}>{props.item.text}</Text>
        <Button color='black' onPress={() => props.handleDeleteGoal(props.item.id)} title="x"/>
      </View>
    )
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
