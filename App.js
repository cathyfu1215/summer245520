import React, { useEffect } from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styleHelper } from './styleHelper';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';



const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in',user);
        setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
      // User is signed out
      console.log('User is signed out');
      setUser(null);
      }
    })
  }, []);
 
  const AuthStack = <>
    <Stack.Screen name="Signup" component={Signup} 
                      options={{title:'Signup'}}
                      />
    <Stack.Screen name="Login" component={Login} 
                      options={{title:'Login'}}
                      />
  </>;
const AppStack = <>
    <Stack.Screen name="Home" component={Home} 
                    options={{title:'All goals'}}
                    />
    <Stack.Screen name="Details" component={GoalDetails} 
                  options={({ navigation, route }) => ({ title: route.params.text, 
                  })}/>
</>
  
  return(
  <NavigationContainer>
    <Stack.Navigator 
    
    /* 
    Modified after lab3: 
    added screenOptions to apply the same style to all screens 
    */
    screenOptions={
          {headerStyle: styleHelper.headerStyle,
          headerTitleStyle: styleHelper.headerTitleStyle,}
        }
        >
          {(user!== null)? AppStack : AuthStack}
      
       
                                             
    </Stack.Navigator>
  
  </NavigationContainer>
  );
}