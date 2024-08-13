import React, { useEffect, useRef, useState } from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styleHelper } from './styleHelper';
import Signup from './components/Signup';
import Login from './components/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import Profile from './components/Profile';
import PressableButton from './components/PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Map from './components/Map';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [user, setUser] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log('User is signed out');
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("User has tapped the notification");
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'All goals',
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <PressableButton pressedFunction={() => navigation.navigate('Profile')}>
                <AntDesign name="user" size={24} color="black" />
              </PressableButton>
            );
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ navigation, route }) => ({ title: route.params.text })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <PressableButton
                pressedFunction={async () => {
                  try {
                    signOut(auth);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <AntDesign name="logout" size={24} color="black" />
              </PressableButton>
            );
          },
        }}
      />
      <Stack.Screen name="Map" component={Map} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styleHelper.headerStyle,
          headerTitleStyle: styleHelper.headerTitleStyle,
        }}
      >
        {user !== null ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
