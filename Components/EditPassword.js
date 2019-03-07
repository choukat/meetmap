// Components/EditPassword.js

import React from 'react'
import {StyleSheet, Text, View, TextInput, Button, ActivityIndicator} from 'react-native'
import Constants from '../helpers/constants'
import { editPassword } from '../API/meetmapDBApi'
import { connect } from 'react-redux'

class EditPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false, errorPassword: false, errorBase: false, errorType: false, passwordEdited: false, errorOldPassword: false }
    this.oldPassword = ""
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

  _displayErrorOldPassword() {
    if(this.state.errorOldPassword) {
      return(
        <Text styles={styles.errorText}>Votre ancien mot de passe n'est pas bon</Text>
      )
    }
  }

  _oldPasswordTextInputChanged(text) {
    this.oldPassword = text
  }

  _passwordTextInputChanged(text) {
    this.password = text
    if (this.passwordVerif != this.password){
      this.setState({errorPassword : true})
    } else {
      this.setState({errorPassword : false})
    }
  }

  _verifPasswordTextInputChanged(text) {
    this.passwordVerif = text
    if (this.passwordVerif != this.password){
      this.setState({errorPassword : true})
    } else {
      this.setState({errorPassword : false})
    }
  }

  _changePassword(){
    this.setState({errorBase : false, errorType : false, errorOldPassword: false})
    if (this.oldPassword != ""
        && this.password != ""
        && this.verifPassword != "") {
       this.setState({isLoading : true})
       var data = ""
       editPassword(this.props.name, this.oldPassword, this.password).then(data => {
         if ( data == null ) {
           this.setState({errorBase : true})
         } else {
           if (data.result == -1) {
             //password modifié
             this.setState({passwordEdited: true})
           } else {
             if(data.result == 0) {
               this.setState({errorOldPassword: true})
             }
           }
         }
         this.setState({isLoading: false})
       })
    } else {
      this.setState({errorType : true})
    }
  }

  _displayPasswordEdited() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.ep_text_container}>
          Votre password vient d'être changé.
        </Text>
        <View style={styles.ep_button_container}>
            <Button title='Retour' color='#70CF70' onPress={() => this.props.navigation.goBack()} />
        </View>
      </View>
    )
  }

  _displayPasswordEdit() {
    return(
      <View style={styles.main_container}>
        <View style={styles.bigText_container}>
          <Text style={styles.bigText}>Changement de mot de passe</Text>
        </View>
        <View style={styles.littleText_container}>
          <Text style={styles.littleText}>Attention, notez bien votre nouveau mot de passe.</Text>
        </View>
        <View style={styles.ep_text_container}>
          {this._displayErrorType()}
          {this._displayErrorBase()}
          {this._displayErrorOldPassword()}
          <Text style={styles.mainText}>Ancien mot de passe : </Text>
        </View>
        <View style={styles.ep_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(text) => this._oldPasswordTextInputChanged(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.ep_text_container}>
          <Text style={styles.mainText}>Nouveau mot de passe : </Text>
        </View>
        <View style={styles.ep_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(text) => this._passwordTextInputChanged(text)}
            secureTextEntry={true}
          />
        </View>
        {this._displayErrorPassword()}
        <View style={styles.ep_text_container}>
          <Text style={styles.mainText}>Nouveau mot de passe (vérification) : </Text>
        </View>
        <View style={styles.ep_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(text) => this._verifPasswordTextInputChanged(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.ep_button_container}>
            <Button title='Change password' color={Constants.BUTTON_COLOR} onPress={() => this._changePassword()} />
        </View>
        {this._displayLoading()}
      </View>
    )
  }

  render() {
    if (!this.state.passwordEdited) {
      return(this._displayPasswordEdit())
    } else {
      return(this._displayPasswordEdited())
    }
  }
}

const styles=StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor: Constants.BACKGROUND_COLOR,
    alignItems:'center'
  },
  errorText: {
    fontSize:15,
    color: Constants.BAD_TEXT_COLOR
  },
  ep_text_container: {
    alignItems:'center',
    margin:10,
  },
  ep_input_container: {
    alignItems:'center',
  },
  textInput: {
    borderRadius:10,
    height:50,
    width:200,
    padding:10,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor:Constants.INPUT_COLOR
  },
  littleText: {
    fontSize:12,
    color: Constants.TEXT_COLOR
  },
  littleText_container: {
    margin:5
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
    color: Constants.TEXT_COLOR
  },
  bigText_container: {
    margin:10
  },
  bigText: {
    fontWeight:'bold',
    fontSize:22,
    color: Constants.TEXT_COLOR
  },
  ep_button_container: {
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

const mapStateToProps = state => {
  return {
    name: state.name
  }
}

export default connect(mapStateToProps)(EditPassword)
