import React from 'react'
import { View, Text, Button } from 'react-native';
import { styleHelper } from '../styleHelper';




function GoalItem(props) {

  function handleInformation(){
    // navigation.navigate(routeName, paramObject)
    props.navigation.navigate('Details',{text:props.item.text, id:props.item.id, isWarning:false});
    //wrap the buttons in a view to style them
  }
    return (
      <View style={styleHelper.itemContainer}>
        <Text style={styleHelper.textStyle}>{props.item.text}</Text>
        <Button color='grey' onPress={() => props.handleDeleteGoal(props.item.id)} title="x"/>
        <Button color='grey' onPress={handleInformation} title="i"/>
      </View>
    )
  }

  

export default GoalItem