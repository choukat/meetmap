// Components/CreateAccount.js

import React from 'react'
import {StyleSheet, Text, View, Image, TextInput, Button, ScrollView, ActivityIndicator} from 'react-native'
import Avatar from './Avatar'
import { addUser } from '../API/meetmapDBApi'

class CreateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorBase: false, errorPassword: false, errorType: false, errorUserName: false, accountCreated: false, isLoading: false }
    this.name = ""
    this.email = ""
    this.password = ""
    this.passwordVerif = ""
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

  _createAccount() {
    this.setState({errorBase: false, errorType: false, errorUserName: false, accountCreated: false})
    if (this.name != ""
        && this.email != ""
        && this.password != ""
        && this.passwordVerif != ""
        && !this.state.errorPassword ) {
       this.setState({isLoading: true})
       var data = ""
       addUser(this.name, this.password, this.email, "avatar").then(data => {
         console.log(data)
         console.log(data.result)
         if ( data == null ) {
           this.setState({errorBase : true})
         } else {
           if (data.result == -1) {
             //compte créé
             this.setState({accountCreated: true})
           } else {
             if(data.result > 0) {
               //utilisateur déjà existant
               this.setState({errorUserName: true})
             } else {
               //erreur database
               this.setState({errorBase: true})
             }
           }
         }
         this.setState({isLoading: false})
       })
    } else {
      this.setState({errorType : true})
    }
  }

  _displayErrorUsername() {
    if(this.state.errorUserName) {
      return(
        <Text styles={styles.errorText}>Le nom d'utilisateur est déjà pris, rééssayez</Text>
      )
    }
  }

  _displayErrorBase() {
    if(this.state.errorBase) {
      return(
        <Text styles={styles.errorText}>Une erreur en base de données s'est produite, rééssayez</Text>
      )
    }
  }

  _displayErrorType() {
    if(this.state.errorType) {
      return(
        <Text styles={styles.errorText}>Vous n'avez pas saisi tous les champs correctement</Text>
      )
    }
  }

  _displayErrorPassword() {
    if(this.state.errorPassword) {
      return(
        <Text styles={styles.errorText}>Votre mot de passe de correspond pas</Text>
      )
    }
  }

  _nameTextInputChanged(text) {
    this.name = text
  }

  _emailTextInputChanged(text) {
    this.email = text
  }

  _passwordTextInputChanged(text) {
    this.password = text
    if (this.passwordVerif != this.password){
      this.setState({errorPassword : true})
    } else {
      this.setState({errorPassword : false})
    }
  }

  _passwordVerifTextInputChanged(text) {
    this.passwordVerif = text
    if (this.passwordVerif != this.password){
      this.setState({errorPassword : true})
    } else {
      this.setState({errorPassword : false})
    }
  }

  _displayLoginPage() {
    this.props.navigation.goBack()
  }

  _displayAccountCreated() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.ca_text_container}>
          Votre compte vient d'être créé.
        </Text>
        <View style={styles.ca_button_container}>
            <Button title='Se connecter' color='#70CF70' onPress={() => this._displayLoginPage()} />
        </View>
      </View>
    )
  }

  _displayCreateAccount() {
    return(
      <ScrollView>
        <View style={styles.main_container}>
          <Avatar/>
          {this._displayErrorBase()}
          {this._displayErrorType()}
          {this._displayErrorUsername()}
          <View style={styles.ca_text_container}>
            <Text style={styles.mainText}>Name : </Text>
          </View>
          <View style={styles.ca_input_container}>
            <TextInput
              style={styles.textInput}
              placeholder='Name'
              onChangeText={(text) => this._nameTextInputChanged(text)}
            />
          </View>
          <View style={styles.ca_text_container}>
            <Text style={styles.mainText}>Adresse e-mail : </Text>
          </View>
          <View style={styles.ca_input_container}>
            <TextInput
              style={styles.textInput}
              placeholder='e-mail'
              onChangeText={(text) => this._emailTextInputChanged(text)}
              keyboardType='email-address'
            />
          </View>
          <View style={styles.ca_text_container}>
            <Text style={styles.mainText}>Password : </Text>
          </View>
          <View style={styles.ca_input_container}>
            <TextInput
              style={styles.textInput}
              placeholder='Password'
              onChangeText={(text) => this._passwordTextInputChanged(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.ca_text_container}>
            <Text style={styles.mainText}>Password verification : </Text>
            {this._displayErrorPassword()}
          </View>
          <View style={styles.ca_input_container}>
            <TextInput
              style={styles.textInput}
              placeholder='Password'
              onChangeText={(text) => this._passwordVerifTextInputChanged(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.ca_button_container}>
              <Button title='Create account' color='#70CF70' onPress={() => this._createAccount()} />
          </View>
          {this._displayLoading()}
        </View>
      </ScrollView>
    )
  }

  render() {
    if(!this.state.accountCreated) {
      return(
        this._displayCreateAccount()
      )
    } else {
      return(
        this._displayAccountCreated()
      )
    }

  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor:'#DFDFDF',
    alignItems:'center'
  },
  avatar_container: {
    alignItems:'center',
    padding:10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#808080',
    borderWidth: 2
  },
  errorText: {
    fontSize:15,
    color:'red'
  },
  ca_text_container: {
    alignItems:'center',
    margin:10,
  },
  ca_input_container: {
    alignItems:'center',
  },
  textInput: {
    borderRadius:10,
    height:50,
    width:200,
    padding:10,
    borderColor: '#808080',
    borderWidth: 1,
    backgroundColor:'antiquewhite'
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
  },
  ca_button_container: {
    padding:15,
    width:200,
  },
  button:{
    flex:1
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

export default (CreateAccount)
