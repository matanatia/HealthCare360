import React, { useState, Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ImageBackground, Text, Image, View, Button } from "react-native";

import Login from "./src/components/Login/Login";
import Home from "./src/components/Home/Home";
import Register from "./src/components/Register/Register";
// import ReactIntro from "./src/components/ReactIntro/ReactIntro";

const MainNavigator = createStackNavigator(
  {
    Home: Home,
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