import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { name as appName } from '../../../app.json';
import Storage from "../../models/Storage";

const Register = ({ navigation }) => {

  //testing using react hooks
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const redirect = (pageName) => {
    navigation.navigate(pageName);
  }

  const ifExsit = () => {
    //check and user in the server
    const server_user_email = "test";

    if (server_user_email === email) {
      return true;
    }
    return false;
  }

  const registerUser = () => {
    const user = { fullName, email, password, confPassword };
    //save user data in the server 
    // .............. 
    //if success save at the server 
      //update storage that the user connected
      Storage.setItem("userToken", "1")
      .catch(function(error) {
        console.log(error);
      });
      //redirect the user to main page
      redirect('AuthLoading');
  }

  const register = () => {
    //check if user name && password in the inputs field - before check validation in the server
    if (fullName === "") {
      Alert.alert("Full Name is required");
      return;
    }

    if (email === "") {
      Alert.alert("Email is required");
      return;
    }

    if (password === "") {
      Alert.alert("Password is required");
      return;
    }

    if (confPassword === "" || confPassword !== password) {
      Alert.alert("Please confirm your password");
      return;
    }

    //check if the user already exsit in the server
    if (ifExsit()) {
      Alert.alert("Email address already exist, please register with other email address");
      return;
    }

    //save user data in the server 
    registerUser();
  }

  return (
    <ImageBackground source={require('../../assets/background-register.jpg')} style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>

        <Text style={styles.h1}>{appName}</Text>
        <Text style={[styles.h1, { color: "black" }]}>Create Account</Text>

        <TextInput style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setFullName(text)}
          value={fullName} />

        <TextInput style={styles.input}
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
          value={email} />

        <TextInput style={styles.input}
          placeholder="Your Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} />

        <TextInput style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfPassword(text)}
          secureTextEntry={true} />

        <TouchableOpacity onPress={() => register()} style={[styles.btn, { backgroundColor: 'green' }]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => redirect('Login')} style={{}}>
          <Text style={{ color: 'green' }}>Back to Login Page</Text>
        </TouchableOpacity>
      </View >
    </ImageBackground>
  );
}

//set navigationOptions
// Register.navigationOptions = {
//   title: "Register"
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


export default Register;