import React from 'react'
import { View,Text } from 'react-native'
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { addUser } from '../Firebase/firestoreHelper';
import {getUsers} from '../Firebase/firestoreHelper';

function GoalUsers({goalID}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const existedUsers = await getUsers(goalID);
            if(!existedUsers){
                setUsers(existedUsers);
                console.log('users exist:');
                return;
            }
        
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            // console.log(response.ok); //useful to know the status of the fetch
            
            if(!response.ok){
              throw new Error('failed to fetch');
            }
            const data = await response.json();
            console.log('fetched data:', data);


            data.forEach(element => {
                addUser(element,goalID);
            });
            setUsers(data);
            
          } catch (error) {
            console.error("Error:", error);
          }
        };
      
        fetchData();
      }, []);

    const renderItem = ({ item }) => (
        <Text>{item.name}</Text> // assuming the user object has a 'name' property
    );

  return (
    <View style={{margin:10, padding:10 ,backgroundColor:'lightgrey'}}>
        <Text style={{margin:5, padding:5}} >Goal users</Text>
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()} // assuming the user object has an 'id' property
        />
    </View>
  )
}

export default GoalUsers