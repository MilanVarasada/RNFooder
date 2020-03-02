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
import MapView from './src/screens/map';
import ProfileScreen from './src/screens/profileScreen'
import {createStore} from 'redux';
import {Provider} from 'react-redux';


const tabbarNavigator = createBottomTabNavigator({
  List: {
    screen: ListRecipe, navigationOptions: {
      title: 'Cooking List'
    }
  },

  Map: {
    screen: MapView, navigationOptions: {
        title: 'Map'
      }
  },

  ProfileScreen: {
    screen: ProfileScreen, navigationOptions: {
        title: 'Profile'
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

const AppContainer = createAppContainer(navigate);
const initalSate = {
  token: ''
}
const reducer = (state=initalSate,action) => {
  switch (action.type) {
      case 'Token':
        return {token : action.token};
      default:
        return {token : action.token};
  }
}
const store = createStore(reducer)
// const ConnectedApp = connectActionSheet(App)

export default function App() {
return (
<Provider store={store}>
  <AppContainer/>
</Provider>
  );
}