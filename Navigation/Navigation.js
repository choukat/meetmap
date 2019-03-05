// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import MainScreen from '../Components/MainScreen'
import CreateAccount from '../Components/CreateAccount'
import Logout from '../Components/Logout'
import EditProfile from '../Components/EditProfile'
import EditPassword from '../Components/EditPassword'
import CreateEvent from '../Components/CreateEvent'
import ManageEvents from '../Components/ManageEvents'
import Parameters from '../Components/Parameters'

const MainScreenStackNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerStyle: {
        width: 0,
        height: 0
      }
    }
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      title: 'Create new account'
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      title: 'Logout'
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'Edit profile'
    }
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      title: 'Edit password'
    }
  },
  CreateEvent: {
    screen: CreateEvent,
    navigationOptions: {
      title: 'Create event'
    }
  },
  ManageEvents: {
    screen: ManageEvents,
    navigationOptions: {
      title: 'Manage events'
    }
  },
  Parameters: {
    screen: Parameters,
    navigationOptions: {
      title: 'Parameters'
    }
  }
})

export default createAppContainer(MainScreenStackNavigator)
