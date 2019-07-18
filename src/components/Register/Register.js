import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { name as appName } from '../../../app.json';

const Register = ({navigation}) => {

  //testing using react hooks
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onPress = (pageName) => {
    navigation.navigate(pageName);
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

        <TouchableOpacity onPress={() => onPress('Home')} style={[styles.btn, { backgroundColor: 'green' }]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPress('Login')} style={{}}>
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