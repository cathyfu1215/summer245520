import React, { useEffect } from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styleHelper } from './styleHelper';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import Profile from './components/Profile';
import PressableButton from './components/PressableButton';
import { Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';






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
    <Stack.Screen name="Login" component={Login} 
                      options={{title:'Login'}}
                      />
    <Stack.Screen name="Signup" component={Signup} 
                      options={{title:'Signup'}}
                      />
    
  </>;
const AppStack = <>
  <Stack.Screen name="Home" component={Home} 
                    options={{title:'All goals', 
                      headerRight: () => {
                        const navigation = useNavigation();
                        return (
                          <PressableButton pressedFunction={() => navigation.navigate('Profile')}>
                            <AntDesign name="user" size={24} color="black" />
                          </PressableButton>
                        );
                      }
                    }}
                    />
    <Stack.Screen name="Details" component={GoalDetails} 
                  options={({ navigation, route }) => ({ title: route.params.text, 
                  })}/>
    <Stack.Screen name="Profile" component={Profile}
                  options={{title:'Profile',headerRight: () => {
                    const navigation = useNavigation();
                    return (
                      <PressableButton pressedFunction={async() => {
                        try {
                          signOut(auth)
                        }
                        catch (error) {
                          console.log(error);
                        }
                      }}
                      >
                       <AntDesign name="logout" size={24} color="black" />
                      </PressableButton>
                    );
                  }
                }}
                />
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