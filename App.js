import React from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Warning from './components/Warning';
import { styleHelper } from './styleHelper';



const Stack = createNativeStackNavigator();

export default function App() {
 
  
  return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
                    options={{headerStyle: styleHelper.headerStyle,
                              headerTitleStyle: styleHelper.headerTitleStyle,
                              title:'All goals'}}/>
    <Stack.Screen name="Details" component={GoalDetails} 
                  options={({ navigation, route }) => ({ title: route.params.text, 
                                             headerRight:()=> {return  <Warning navigation= {navigation} route={route} />},
                                             headerStyle: styleHelper.headerStyle,
                                             
                                             headerTitleStyle: styleHelper.headerTitleStyle,
                                             
                  })}/>
                                             
    </Stack.Navigator>
  
  </NavigationContainer>
  );
}
