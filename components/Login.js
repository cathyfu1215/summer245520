import { View, Text } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import { TextInput } from 'react-native'

function Login(props) {


    function jumpToSignup(){
        props.navigation.navigate('Signup');
    }
    function handleLogin(){
        console.log('login');
    }
  return (
    <View>
        <Text>log in</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}/>
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}/>
        <PressableButton pressedFunction={handleLogin}><Text>Log In</Text></PressableButton>
        <PressableButton pressedFunction={jumpToSignup}><Text>New User? Create an account</Text></PressableButton>
    </View>
  )
}

export default Login
