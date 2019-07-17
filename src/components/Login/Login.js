import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { name as appName } from '../../../app.json';

const Login = ({navigation}) => {

  //testing using react hooks
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  navigationOptions = {
    header: null
  }

  //header at the page is null
  const onPress = (pageName) => {
    navigation.navigate(pageName);
  }

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>

        <Text style={styles.h1}>{appName}</Text>

        <TextInput style={styles.input}
          placeholder="User Name"
          onChangeText={(text) => setUserName({ text })}
          value={userName} />

        <TextInput style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword({ text })}
          value={password} />

        <TouchableOpacity onPress={() => onPress('Home')} style={[styles.btn, { backgroundColor: 'green' }]}>
          <Text style={[styles.btnText, { color: 'white' }]}>Login</Text>
        </TouchableOpacity>

        <Text>Not registered?</Text>
        <TouchableOpacity onPress={() => onPress('Register')} style={{}}>
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