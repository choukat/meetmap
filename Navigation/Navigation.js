// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from '../helpers/constants'
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
      title: 'Create new account',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      title: 'Logout',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      title: 'Edit profile',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      title: 'Edit password',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  CreateEvent: {
    screen: CreateEvent,
    navigationOptions: {
      title: 'Create event',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  ManageEvents: {
    screen: ManageEvents,
    navigationOptions: {
      title: 'Manage events',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  },
  Parameters: {
    screen: Parameters,
    navigationOptions: {
      title: 'Parameters',
      headerStyle: {
        backgroundColor: Constants.BACKGROUND_COLOR
      },
      headerTitleStyle: {
        color: Constants.TEXT_COLOR
      }
    }
  }
})

export default createAppContainer(MainScreenStackNavigator)
