import { View, Text } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import { TextInput } from 'react-native'
import { useState } from 'react'
import {auth} from '../Firebase/firebaseSetup'
import { signInWithEmailAndPassword } from 'firebase/auth'

function Login(props) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');


    function jumpToSignup(){
        props.navigation.navigate('Signup');
    }
    function handleLogin(){
        console.log('login');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user signed in',user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode,errorMessage);
            });
    }
  return (
    <View>
        <Text>log in</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        value={email} onChangeText={(text)=>setEmail(text)}/>
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        value={password} onChangeText={(text)=>setPassword(text)}/>
        <PressableButton pressedFunction={handleLogin}><Text>Log In</Text></PressableButton>
        <PressableButton pressedFunction={jumpToSignup}><Text>New User? Create an account</Text></PressableButton>
    </View>
  )
}

export default Login
