import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { name as appName } from '../../../app.json';
import Storage from "../../models/Storage";

const Home = ({ navigation }) => {

  const redirect = (pageName) => {
    navigation.navigate(pageName);
  }

  const LogOut = async () => {
    try {
      await Storage.removeItem('userToken');
      redirect("AuthLoading");
    }
    catch (error) {
      Alert.alert("Error: ", error.message);
    }
  }

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>
        <Text style={[styles.h1, { color: "black" }]}>Welcome to</Text>
        <Text style={styles.h1}>{appName}</Text>

        <TouchableOpacity onPress={() => LogOut()} style={[styles.btn, { backgroundColor: 'green' }]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Log out</Text>
        </TouchableOpacity>
      </View >
    </ImageBackground >
  );
}

//set navigationOptions
// Home.navigationOptions = {
//   title: "Main"
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  h1: {
    fontSize: 34,
    fontWeight: '600',
    color: "green"
  },

  btn: {
    display: 'flex',
    padding: 5,
    height: 50,
    width: "50%",
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },

  btnText: {
    fontWeight: "600",
    fontSize: 19,
    textTransform: 'uppercase',
  },
});

export default Home;