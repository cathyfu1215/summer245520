import React from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Notifications from "expo-notifications";


function NotificationManager() {
    const scheduleNotificationHandler = async () => {
        try {
          if (await verifyPermissions()) {
            let identifier = await Notifications.scheduleNotificationAsync({
              content: {// this is the notificationRequestInput object
                title: 'Test Notification',
                body: 'This is a test notification',
              },
              trigger: {
                seconds: 5, // Trigger after 5 seconds
                // date: new Date(Date.now() + 30 * 60 * 1000), // Trigger 30 minutes from now
                // The date property is used because it expects a Date object, which represents a specific point in time, even if that point is calculated based on the current time plus an interval.
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
