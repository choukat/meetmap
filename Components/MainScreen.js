// Components/mainScreen.js

import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator} from 'react-native'
import Constants from '../helpers/constants'
import { testAPI, checkLogin } from '../API/meetmapDBApi'
import { requestPositionPermission } from '../permissions/permissions'
import { connect } from 'react-redux'
import TopMenu from './TopMenu'
import MapCustom from './MapCustom'
import ProfileMenu from './ProfileMenu'
import ActionMenu from './ActionMenu'

class MainScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { errorLog: false, profileMenu: false, actionMenu: false, isLoading: false, positionPermission: true }
    this.pseudo = ""
    this.password = ""
    this.avatar = ""
    this._displayLoginPage = this._displayLoginPage.bind(this)
    this._displayMainPage = this._displayMainPage.bind(this)
    this._clickOnProfile = this._clickOnProfile.bind(this)
    this._clickOnActionMenu = this._clickOnActionMenu.bind(this)
    this._displayLogoutPage = this._displayLogoutPage.bind(this)
    this._displayEditProfilePage = this._displayEditProfilePage.bind(this)
    this._displayCreateEventPage = this._displayCreateEventPage.bind(this)
    this._displayManageEventsPage = this._displayManageEventsPage.bind(this)
    this._displayParametersPage = this._displayParametersPage.bind(this)
  }

  _pseudoTextInputChanged(text) {
    this.pseudo = text
  }

  _passwordTextInputChanged(text) {
    this.password = text
  }

  _login(){
    this.setState({isLoading: true})
    var data = ""
    checkLogin(this.pseudo, this.password).then(data => {
      if ( data == null ) {
        console.log('bad login')
        this.setState({errorLog : true})
      } else {
        this.setState({errorLog: false})
        const actionSetName = {type: "SET_NAME", value: data[0].name}
        const actionSetEmail = {type: "SET_EMAIL", value: data[0].email}
        const actionLogged = {type: "LOGIN"}
        this.props.dispatch(actionLogged)
        this.props.dispatch(actionSetName)
        this.props.dispatch(actionSetEmail)
        this.pseudo = ""
        this.password = ""
        this.email = ""
        this.avatar = ""
      }
      this.setState({isLoading: false})
    })
  }

  _displayError() {
    if(this.state.errorLog) {
      return(
        <Text styles={styles.errorText}>Votre mot de passe/Login est erroné rééssayez</Text>
      )
    }
  }

  _displayCreateEventPage() {
    this.props.navigation.navigate("CreateEvent")
  }

  _displayManageEventsPage() {
    this.props.navigation.navigate("ManageEvents")
  }

  _displayParametersPage() {
    this.props.navigation.navigate("Parameters")
  }

  _displayLogoutPage() {
    this.props.navigation.navigate("Logout")
  }

  _displayCreateAccountPage() {
    this.props.navigation.navigate("CreateAccount")
  }

  _displayEditProfilePage() {
    this.props.navigation.navigate("EditProfile")
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }


  _displayLoginPage() {
    return(
      <View style={styles.login_container}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={require('../Images/ic_tag_faces.png')} />
        </View>
        {this._displayError()}
        <View style={styles.login_text_container}>
          <Text style={styles.mainText}>Name : </Text>
        </View>
        <View style={styles.login_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='Name'
            onChangeText={(text) => this._pseudoTextInputChanged(text)}
            defaultValue= {this.pseudo}
          />
        </View>
        <View style={styles.login_text_container}>
          <Text style={styles.mainText}>Password : </Text>
        </View>
        <View style={styles.login_input_container}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(text) => this._passwordTextInputChanged(text)}
            defaultValue= {this.password}
          />
        </View>
        <View style={styles.login_button_container}>
            <Button title='Login' color={Constants.BUTTON_COLOR} onPress={() => this._login()} />
        </View>
        <View style={styles.login_button_container}>
            <Button title='Create account' color={Constants.BUTTON_COLOR} onPress={() => this._displayCreateAccountPage()} />
        </View>
        {this._displayLoading()}
      </View>
    )
  }

  _displayMainPage() {
    return(
      <View style={styles.main_container}>
        <TopMenu
          clickOnProfile={this._clickOnProfile}
          clickOnActionMenu={this._clickOnActionMenu}/>
        <MapCustom/>
        {this._displayProfileMenu()}
        {this._displayActionMenu()}
        {this._displayLoading()}
      </View>
    )
  }

  _displayProfileMenu() {
    if(this.state.profileMenu)
    {
      return(
        <View style={styles.profile_menu_container}>
          <ProfileMenu
            displayLogoutPage={this._displayLogoutPage}
            displayEditProfilePage={this._displayEditProfilePage}/>
        </View>
      )
    }
  }

  _displayActionMenu() {
    if(this.state.actionMenu) {
      return(
        <View style={styles.action_menu_container}>
          <ActionMenu
            displayCreateEventPage={this._displayCreateEventPage}
            displayManageEventsPage={this._displayManageEventsPage}
            displayParametersPage={this._displayParametersPage}/>
        </View>
      )
    }
  }

  _displayWaitPermission() {
    return(
      <View style={styles.main_container}>
        <Text>NON</Text>
      </View>
    )
  }

  _clickOnProfile() {
    if(this.state.actionMenu) {
      this.setState({actionMenu: false})
    }
    this.setState({profileMenu : !this.state.profileMenu})
  }

  _clickOnActionMenu() {
    if(this.state.profileMenu) {
      this.setState({profileMenu: false})
    }
    this.setState({actionMenu: !this.state.actionMenu})
  }

  render() {
    if(this.state.positionPermission) {
      if (this.props.logged) {
        return(
          this._displayMainPage()
        )
      } else {
        return(
          this._displayLoginPage()
        )
      }
    } else {

      return(
        this._displayWaitPermission()
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor: Constants.BACKGROUND_COLOR,
  },
  login_container: {
    flex:1,
    backgroundColor: Constants.BACKGROUND_COLOR,
    alignItems:'center'
  },
  avatar_container: {
    alignItems:'center',
    padding:10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 2
  },
  login_text_container: {
    alignItems:'center',
    margin:10,
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
    color: Constants.TEXT_COLOR
  },
  errorText: {
    fontSize:15,
    color: Constants.BAD_TEXT_COLOR
  },
  login_input_container: {
    alignItems:'center',
  },
  textInput: {
    borderRadius:10,
    height:50,
    width:200,
    padding:10,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: Constants.INPUT_COLOR
  },
  login_button_container: {
    padding:15,
    width:200
  },
  profile_menu_container: {
    position:'absolute',
    top:50,
    right:0,
  },
  action_menu_container: {
    position:'absolute',
    top:50,
    left:0,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name,
    email: state.setProfile.email,
    logged: state.setProfile.logged
  }
}

export default connect(mapStateToProps)(MainScreen)
