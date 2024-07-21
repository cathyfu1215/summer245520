import React from 'react';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styleHelper } from './styleHelper';



const Stack = createNativeStackNavigator();

export default function App() {
 
  
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
      <Stack.Screen name="Home" component={Home} 
                    options={{title:'All goals'}}
                    />
    <Stack.Screen name="Details" component={GoalDetails} 
                  options={({ navigation, route }) => ({ title: route.params.text, 
                                           //  headerRight:()=> {return  <Warning navigation= {navigation} route={route} />},  
                  })}/>
                                             
    </Stack.Navigator>
  
  </NavigationContainer>
  );
}