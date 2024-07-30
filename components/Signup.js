import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import PressableButton from './PressableButton'
import {auth} from '../Firebase/firebaseSetup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

function Signup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function jumpToLogin(){
        props.navigation.navigate('Login');
    }

    function handleRegister(){
        console.log('some validation...');
        console.log('registering');
        console.log('auth',auth);
    
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });

    }
  return (
    <View>
        <Text>signup</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10, height:'15%'}}
        onChangeText={(text)=>{setEmail(text)}}
        value={email} />
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        onChangeText={(text)=>{setPassword(text)}}
        value={password}/>
        <Text>Confirm Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        onChangeText={(text)=>{setConfirmPassword(text)}}
        value={confirmPassword}
        />
        <PressableButton pressedFunction={handleRegister}><Text>Register</Text></PressableButton>
        <PressableButton pressedFunction={jumpToLogin}><Text>Already Registered? Login</Text></PressableButton>
    </View>
  )
}

export default Signup
