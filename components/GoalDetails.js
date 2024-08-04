import React from 'react'
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { updateDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
import { Image } from 'react-native';

function GoalDetails({route,navigation}) {
  //console.log("params in GoalDetails", route.params);
  
  const reference = ref(storage, route.params.image);
  console.log("reference", reference);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    getDownloadURL(reference)
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        console.log('error downloading the image',error);
      });
  }, []);

 //console.log("imageURL", imageURL);

  /*
  Modification after lab3:
  using the route.params to get the data passed from the previous screen
  and using setOptions to change the title of the screen
  */

  const [warning, setWarning] = useState(false);
  function warningHandler() {
    //console.log("warning");
    setWarning(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB(route.params.id, "goals");
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
    

      <Text style={warning && styles.warningStyle}>
          goal text : {route.params.text}
        </Text>
        <Text style={warning && styles.warningStyle}>
          id:{route.params.id}
        </Text>
        

      <View style={{alignSelf:'center',margin:20}}>
      {imageURL !== "" ? (
        <Image source={{ uri: imageURL }} style={{ height: 200, width: 200 }} />
      ) : (
        <Text>No image attached</Text>
      )}
      </View>

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