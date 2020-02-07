import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from './src/screens/LoginScreen'
import ListRecipe from'./src/screens/ListRecipe'

const navigator = createStackNavigator(
  {
    Login:LoginScreen,
    List:ListRecipe
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);