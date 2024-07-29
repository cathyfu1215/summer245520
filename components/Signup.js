import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import PressableButton from './PressableButton'

function Signup(props) {

    function jumpToLogin(){
        props.navigation.navigate('Login');
    }

    function handleRegister(){
        console.log('register');
    }
  return (
    <View>
        <Text>signup</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10, height:'15%'}} />
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}/>
        <Text>Confirm Password</Text>
        <TextInput  />
        <PressableButton pressedFunction={handleRegister}><Text>Register</Text></PressableButton>
        <PressableButton pressedFunction={jumpToLogin}><Text>Already Registered? Login</Text></PressableButton>
    </View>
  )
}

export default Signup
