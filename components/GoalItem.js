import React from 'react'
import { View, Text, Button, Pressable } from 'react-native';
import { styleHelper } from '../styleHelper';
import { Feather } from '@expo/vector-icons';





function GoalItem(props) {

  function handleInformation(){
    // navigation.navigate(routeName, paramObject)
    props.navigation.navigate('Details',{text:props.item.text, id:props.item.id, 
      image:props.item.image,isWarning:false});
    //wrap the buttons in a view to style them
  }
    return (
      <View style={styleHelper.itemContainer}>
        <Pressable style={({ pressed }) => [
      styleHelper.goalItemStyle,
      {
        // make opacity 0.5 if pressed
        opacity: pressed ? 0.1 : 1
      }
    ]} onPress={handleInformation} android_ripple={{color:'blue'}}>
        <Text style={styleHelper.textStyle}>{props.item.text}</Text>
        {/* <Button color='grey' onPress={() => props.handleDeleteGoal(props.item.id)} title="x"/> */}
        <Pressable style={({ pressed }) => [
      styleHelper.goalItemStyle,
      {
        // make opacity 0.5 if pressed
        opacity: pressed ? 0.1 : 1
      }]} android_ripple={{color:'blue'}}
        onPress={() => props.handleDeleteGoal(props.item.id)}>
          <Text style={styleHelper.deleteStyle}><Feather name="trash-2" size={24} color="black" /></Text>
        </Pressable>
        </Pressable>
      </View>
    )
  }

  

export default GoalItem