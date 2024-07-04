import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';

export default function App() {

  const appName = 'Cathy\'s summer project';
  return (
    <View style={styles.container}>
      <Header name = {appName} theme="dark">
        <Text>child1</Text>
        <Text>child2</Text>
      </Header>
      <Text>Welcome to {appName}(I am a text)</Text>
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
