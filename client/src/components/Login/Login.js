import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';

import Storage from "../../models/Storage";
import Valid from "../../models/InputValidation";

import { name as appName } from '../../../app.json';
import { BACKEND_IP as ip } from '../../../env.json';
const endPoint = `http://${ip}:5000/api/auth`;

const Login = ({ navigation }) => {

  //testing using react hooks
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const redirect = (pageName) => {
    navigation.navigate(pageName);
  }

  const authenticateUser = () => {
    const userLogin = { email: userName, password };
    return fetch(`${endPoint}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin)
    });
  }



  const login = async () => {
    //check inputs field before check validation in the server
    if (!Valid.required([userName])) {
      return Alert.alert("User name is required");
    }

    if (!Valid.email(userName)) {
      return Alert.alert("User name format is incorrect","Please enter the email address you registered with");
    }

    if (!Valid.required([password])) {
      return Alert.alert("Password is required");
    }

    try {
      const res = await authenticateUser();
      //if failed to login at the server
      if (res.status !== 200) {
        const data = await res.json();
        return Alert.alert(data.message);
      }

      //login successfully - update storage that the user connected
      Storage.setItem("userToken", "1")
        .catch(function (error) {
          console.log(error);
        });
      //redirect the user to main page
      redirect('App');

    } catch (error) {
      return alert(error.message);
    }
  }

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>

        <Text style={styles.h1}>{appName}</Text>

        <TextInput style={styles.input}
          placeholder="User Name"
          onChangeText={(text) => setUserName(text)}
          value={userName} />

        <TextInput style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={() => login()} style={[styles.btn, { backgroundColor: 'green' }]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Login</Text>
        </TouchableOpacity>

        <Text>Not registered?</Text>
        <TouchableOpacity onPress={() => redirect('Register')} style={{}}>
          <Text style={{ color: 'green' }}>Create an account</Text>
        </TouchableOpacity>

      </View >
    </ImageBackground>
  );
}

//set navigationOptions
// Login.navigationOptions = {
//   title: "Login"
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
  input: {
    width: "90%",
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1
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

export default Login;