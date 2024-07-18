import { StyleSheet } from "react-native";

export const styleHelper = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'darkblue',
      },
      headerTitleStyle: {
        fontSize: 20,
        color: 'white'
      },
      itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'lightgrey'
      },
      textStyle: {
              fontSize: 15,
              color: 'darkblue',
              marginVertical:5,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
            },
        headerCompStyle:{
          padding:10, 
          fontSize:22, 
          backgroundColor:"lightblue", 
          borderColor:'gold', 
          borderWidth:2, 
          padding: 5, 
          margin:5
        },
        goalItemStyle:{
          
          fontSize:10,
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        deleteStyle:{
          padding:5,
        },
        warningButtonStyle:{
          padding:5,
          color: 'white',
          borderRadius: 10,
        }
              
        
    });