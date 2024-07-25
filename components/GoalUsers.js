import React from 'react'
import { View,Text } from 'react-native'
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

function GoalUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
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
    <View style={{margin:10, padding:10}}>
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