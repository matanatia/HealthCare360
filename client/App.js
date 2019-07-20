import React, { useState, Component, useEffect} from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { ImageBackground, Text, Image, View, Button, StatusBar, ActivityIndicator } from "react-native";
import Storage from "./src/models/Storage";

import Login from "./src/components/Login/Login";
import Home from "./src/components/Home/Home";
import Register from "./src/components/Register/Register";
import Loading from "./src/components/Loading/Loading";
// import ReactIntro from "./src/components/ReactIntro/ReactIntro";

const AppStack = createStackNavigator(
  { Home: Home },  
  { defaultNavigationOptions: { header: null }}
  );

const AuthStack = createStackNavigator(
  { Login: Login, Register: Register},  
  { defaultNavigationOptions: { header: null }}
  );

const Navigator = createSwitchNavigator(
  {
    AuthLoading: Loading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "AuthLoading",
    defaultNavigationOptions: {
      header: null
    }
  }
 );

const App = createAppContainer(Navigator);

export default App;