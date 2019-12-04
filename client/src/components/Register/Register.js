import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert
} from "react-native";

//develop
import Storage from "../../models/Storage";
import Valid from "../../models/InputValidation";

import { name as appName } from "../../../app.json";
import {
  ANDROID_BACKEND_END_POINT,
  IOS_BACKEND_END_POINT
} from "../../../env.json";

const endPoint =
  Platform.OS === "ios"
    ? `${IOS_BACKEND_END_POINT}/api/auth`
    : `${ANDROID_BACKEND_END_POINT}/api/auth`;

const Register = ({ navigation }) => {
  //testing using react hooks
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const redirect = pageName => {
    navigation.navigate(pageName);
  };

  const registerUser = () => {
    const user = { full_name: fullName, email, password };

    return fetch(`${endPoint}/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
  };

  const register = async () => {
    //check if user name && password in the inputs field - before check validation in the server
    if (!Valid.required([fullName])) {
      return Alert.alert("Full Name is required");
    }

    if (!Valid.required([email])) {
      return Alert.alert("Email is required");
    }

    if (!Valid.email(email)) {
      return Alert.alert("Email format is incorrect");
    }

    if (!Valid.required([password])) {
      return Alert.alert("Password is required");
    }

    if (!Valid.required([confPassword])) {
      return Alert.alert("Please confirm your password");
    }

    if (!Valid.equal(confPassword, password)) {
      return Alert.alert("The passwords doesn't match");
    }

    //save user data in the server
    try {
      const res = await registerUser();
      //if failed to register at the server
      if (res.status !== 200) {
        const data = await res.json();
        return Alert.alert(data.message);
      }

      //register successfully - update storage that the user connected
      Storage.setItem("userToken", "1").catch(function(error) {
        console.log(error);
      });
      //redirect the user to main page
      redirect("AuthLoading");
    } catch (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background-register.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.h1}>{appName}</Text>
        <Text style={[styles.h1, { color: "black" }]}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={text => setFullName(text)}
          value={fullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email address"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Password"
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={text => setConfPassword(text)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={() => register()}
          style={[styles.btn, { backgroundColor: "green" }]}
        >
          <Text style={[styles.btnText, { color: "white" }]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => redirect("Login")} style={{}}>
          <Text style={{ color: "green" }}>Back to Login Page</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

//set navigationOptions
// Register.navigationOptions = {
//   title: "Register"
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.7)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  h1: {
    fontSize: 34,
    fontWeight: "600",
    color: "green"
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1
  },
  btn: {
    display: "flex",
    padding: 5,
    height: 50,
    width: "50%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },

  btnText: {
    fontWeight: "600",
    fontSize: 19,
    textTransform: "uppercase"
  }
});

export default Register;
