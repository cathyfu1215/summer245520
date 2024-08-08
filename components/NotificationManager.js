import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from "expo-notifications";


function NotificationManager() {
    const scheduleNotificationHandler = async () => {
        try {
          if (await verifyPermissions()) {
            let identifier = await Notifications.scheduleNotificationAsync({
              content: {
                title: 'Test Notification',
                body: 'This is a test notification',
              },
              trigger: {
                seconds: 5, // Trigger after 5 seconds
              },
            });
            console.log('notification scheduled:', identifier);
          } else {
            console.log('permissions not granted');
          }
        } catch (err) {
          console.log('error scheduling notification:', err);
        }
      };
    
      const verifyPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('You need to enable permissions to send notifications');
            return false;
          }
        }
        return true;
      };



  return (
    <View>
        <Text>  NotificationManager </Text>
        <Pressable style={{backgroundColor:'lightblue',padding:10,margin:10}} onPress={scheduleNotificationHandler}>
            <Text style={{color:'black',alignSelf:'center'}}>Enable Notifications</Text>
        </Pressable>
    </View>
  )
}

export default NotificationManager
