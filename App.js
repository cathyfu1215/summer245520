import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { TextInput } from 'react-native';
import React, { useState } from 'react';
import Input from './components/Input';

export default function App() {

  const appName = 'Cathy\'s summer project';

  return (
    <View style={styles.container}>
      <Header name = {appName} theme="dark">
      </Header>
      <Text>Welcome to {appName}(I am a text)</Text>
      <Input />
       
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
