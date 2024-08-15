import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Platform, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { writeToDB, deleteFromDB } from '../Firebase/firestoreHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { database, auth, storage } from '../Firebase/firebaseSetup';
import { ref, uploadBytesResumable } from 'firebase/storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

function Home(props) {
  const [goals, setGoals] = useState([]);
  const [imageURI, setImageURI] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const appName = "Cathy's Goal Tracker";

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        query(collection(database, "goals"), where("owner", "==", auth.currentUser.uid)),
        (querySnapshot) => {
          const goals = [];
          querySnapshot.forEach((doc) => {
            goals.push({ ...doc.data(), id: doc.id });
          });
          setGoals(goals);
        }
      );
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  };

  const handleInputData = async (data) => {
    const newGoal = { text: data, owner: auth.currentUser.uid, image: imageURI };

    try {
      const response = await fetch(newGoal.image);
      const blob = await response.blob();
      const imageName = newGoal.image.substring(newGoal.image.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);

      const goal = {
        text: data,
        owner: auth.currentUser.uid,
        image: uploadResult.metadata.fullPath
      };

      writeToDB(goal, "goals");
    } catch (error) {
      console.log('error in uploading image:', error);
    }
  };

  const handleModalVisible = () => {
    setModalVisible(true);
  };

  const handleModalNotVisible = () => {
    setModalVisible(false);
  };

  const handleDeleteGoal = (id) => {
    deleteFromDB(id, "goals");
  };

  const sendNotification = async () => {
    try {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: expoPushToken,
          title: "Push Notification",
          body: "This is a push notification",
        })
      });
    } catch (error) {
      console.log('error in sending notification:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} theme="dark" />
        <View style={styles.buttonStyle}>
          <Button title="Add a goal" onPress={handleModalVisible} />
        </View>
      </View>
      <Input
        handleInputData={handleInputData}
        modalVisible={modalVisible}
        handleModalNotVisible={handleModalNotVisible}
        setupImageURI={setImageURI}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.textStyle}>Your Goals:</Text>
        {goals.length === 0 ? <Text>Please enter goals...</Text> : null}
        <FlatList
          renderItem={({ item }) => (
            <GoalItem item={item} handleDeleteGoal={handleDeleteGoal} navigation={props.navigation} route={props.route} />
          )}
          data={goals}
        />
        <Button title="send a push notification" onPress={sendNotification} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: "30%",
    margin: 10
  },
  textStyle: {
    fontSize: 20,
    color: 'darkblue',
    marginVertical: 5,
    padding: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    rowGap: 5,
  }
});

export default Home;
