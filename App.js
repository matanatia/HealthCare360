import React, { useState, Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ImageBackground, Text, Image, View, Button } from "react-native";

import Login from "./src/components/Login/Login";
import Main from "./src/components/Main/Main";
import Register from "./src/components/Register/Register";
// import ReactIntro from "./src/components/ReactIntro/ReactIntro";

const MainNavigator = createStackNavigator(
  {
    Home: Main,
    Login: Login,
    Register: Register
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      header: null
    }
  }
 );

const App = createAppContainer(MainNavigator);

export default App;