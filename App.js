import React from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Warning from './components/Warning';
import { Text } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
                    options={{headerStyle: {
                                backgroundColor: 'darkblue',
                              },
                              headerTitleStyle: {
                                fontSize: 20,
                                color: 'white'
                              },
                              title:'Home'}}/>
    <Stack.Screen name="Details" component={GoalDetails} 
                  options={({ route }) => ({ title: route.params.text, 
                                             headerRight:()=> {return <Warning/> },
                                             headerLeft:()=> {return <Text style={{color: "white",margin: 5, padding: 5}}>  ← All my goals</Text> },
                                             headerStyle: {
                                              backgroundColor: 'darkblue',
                                            },
                                            headerTitleStyle: {
                                              fontSize: 20,
                                              color: 'white'
                                            },
                                             })}/>
    </Stack.Navigator>
  
  </NavigationContainer>
  );
}