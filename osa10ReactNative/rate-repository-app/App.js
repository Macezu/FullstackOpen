import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HelloWorld = ({name})  => {
  return <Text>Hello {name}</Text>;};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TESTIN</Text>
      <HelloWorld name="Kalle"/>
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
