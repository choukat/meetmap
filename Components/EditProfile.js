// Components/EditProfile.js

import React from 'react'
import {StyleSheet, Text, View, Image, TextInput, Button, ScrollView, ActivityIndicator} from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'
import { editUser } from '../API/meetmapDBApi'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false, errorUserName : false, errorBase : false, errorType : false, accountEdited : false }
    this.name = this.props.name
    this.email = this.props.email
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

  _nameTextInputChanged(text) {
    this.name = text
  }

  _emailTextInputChanged(text) {
    this.email = text
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

  _editPassword() {
    this.props.navigation.navigate("EditPassword")
  }

  _editAccount() {
    this.setState({errorBase: false, errorType: false, errorUserName: false})
    if (this.name != ""
        && this.email != "") {
       this.setState({isLoading: true})
       var data = ""
       editUser(this.props.name, this.name, this.email, "avatar").then(data => {
         console.log(data)
         console.log(data.result)
         if ( data == null ) {
           this.setState({errorBase : true})
         } else {
           if (data.result == -1) {
             //compte modifié
             this.setState({accountEdited: true})
             const actionSetName = {type: "SET_NAME", value: this.name}
             const actionSetEmail = {type: "SET_EMAIL", value: this.email}
             this.props.dispatch(actionSetName)
             this.props.dispatch(actionSetEmail)
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

  _displayProfileEdited() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.ep_text_container}>
          Votre Profil vient d'être modifié.
        </Text>
        <View style={styles.ep_button_container}>
            <Button title='Retour' color='#70CF70' onPress={() => this.props.navigation.goBack()} />
        </View>
      </View>
    )
  }

  _displayProfileEdit() {
    return(
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={require('../Images/ic_tag_faces.png')} />
        </View>
        {this._displayErrorBase()}
        {this._displayErrorType()}
        {this._displayErrorUsername()}
        <View style={styles.ep_text_container}>
          <Text style={styles.mainText}>Name : </Text>
        </View>
        <View style={styles.ep_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='Name'
            onChangeText={(text) => this._nameTextInputChanged(text)}
            defaultValue={this.name}
          />
        </View>
        <View style={styles.ep_text_container}>
          <Text style={styles.mainText}>Adresse e-mail : </Text>
        </View>
        <View style={styles.ep_input_container}>
          <TextInput
            style={styles.textInput}
            placeholder='e-mail'
            onChangeText={(text) => this._emailTextInputChanged(text)}
            keyboardType='email-address'
            defaultValue={this.email}
          />
        </View>
        <View style={styles.ep_button_container}>
          <Button title='Change password' color={Constants.BUTTON_COLOR} onPress={() => this._editPassword()} />
        </View>
        <View style={styles.ep_button_container}>
            <Button title='Edit account' color={Constants.BUTTON_COLOR} onPress={() => this._editAccount()} />
        </View>
        {this._displayLoading()}
      </View>
    )
  }

  render() {
    if(!this.state.accountEdited) {
      return(this._displayProfileEdit())
    } else {
      return(this._displayProfileEdited())
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor:Constants.BACKGROUND_COLOR,
    alignItems:'center',
  },
  avatar_container: {
    alignItems:'center',
    padding:10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 2
  },
  errorText: {
    fontSize:15,
    color:Constants.BAD_TEXT_COLOR
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
  mainText: {
    fontWeight:'bold',
    fontSize:20,
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
    name: state.name,
    email: state.email
  }
}

export default connect(mapStateToProps)(EditProfile)
