import React from 'react'
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { updateDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';


function GoalDetails({route,navigation}) {

  console.log(route.params);

  /*
  Modification after lab3:
  using the route.params to get the data passed from the previous screen
  and using setOptions to change the title of the screen
  */

  const [warning, setWarning] = useState(false);
  function warningHandler() {
    console.log("warning");
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.id);
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button title="Warning" color="white" onPress={warningHandler} />
        );
      },
    });
  }, []);
 
  // access route.parames to get the data passed from the previous screen
  
  return (
    <View>
    

      {route.params ? (<Text style={warning && styles.warningStyle}>
          goal text :
          {route.params.text}, id:{route.params.id}
        </Text>
        ) : (
          <Text></Text>
        )}

      <GoalUsers goalID={route.params.id}/>
      </View>
    );
  }

export default GoalDetails

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});