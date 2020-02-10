import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from './src/screens/LoginScreen'
import ListRecipe from'./src/screens/ListRecipe'
import RecipeCell from './src/Components/RecipeCell'
import RecipeDetails from './src/screens/RecipeDetails'
import SettingComponent from './src/screens/setting';
import AddRecipeComponent from './src/screens/AddRecipeComponent';

const tabbarNavigator = createBottomTabNavigator({
  List: {
    screen: ListRecipe, navigationOptions: {
      title: 'Cooking List'
    }
  },
  setting: {
    screen: SettingComponent, navigationOptions: {
      title: 'Settings'
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'rgba(255,0,80,1)',
  }
})

const detailNavigation = createStackNavigator({
  tabbarNavigator,
  RecipeDetails: { screen: RecipeDetails , navigationOptions:{ ...TransitionPresets.SlideFromRightIOS}},
  Add: { screen: AddRecipeComponent, navigationOptions: { ...TransitionPresets.ModalPresentationIOS } }
}, {
  headerMode: "none"
});

const navigator = createStackNavigator(
  {
    Login:LoginScreen,
    List:ListRecipe,
    RecipeCell:RecipeCell,
    RecipeDetails:RecipeDetails
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Login Screen',
    }
  }
);

const navigate = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen, navigationOptions: { headerShown: false }
    },
    detailNavigation
  }
)

export default createAppContainer(navigate);