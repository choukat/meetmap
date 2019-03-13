// Components/Logout.js

import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, ActivityIndicator } from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'
import SwitchSelector from 'react-native-switch-selector'
import { createEvent } from '../API/meetmapDBApi'

class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false, errorDB: false, errorInput: false, errorPosition: false, eventCreated: false}
    this.title = ''
    this.description = ''
    this.time = '30'
    this.latitude = '0'
    this.longitude = '0'
  }

  _titleTextInputChanged(text) {
    this.title = text
  }

  _descriptionTextInputChanged(text) {
    this.description = text
  }

  _timeSwitchChanged(time) {
    this.time = time
  }

  _createEvent() {
    this.setState({isLoading: true, inputError:false, errorDB: false})
    if(this.props.name != '' && this.title != '' && this.time != '') {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          this.longitude= position.coords.longitude.toString()
          this.latitude = position.coords.latitude.toString()
          console.log('position Finded')
          console.log(this.props.name)
          console.log(this.title)
          console.log(this.description)
          console.log(this.longitude)
          console.log(this.latitude)
          var data = ""
          createEvent(this.props.name, this.title, this.time, this.description, this.longitude, this.latitude)
          .then(data => {
            console.log(data)
            if ( data.result == -1 ) {
              this.setState({isLoading: false, eventCreated: true})
            } else {
              this.setState({errorDB : true, isLoading: false})
            }
          })
        },
        error => {console.log(error.message)
                  this.setState({isLoading: false, errorPosition: true})},
        { enableHighAccuracy: true, timeout: 5000}
      );
    } else {
      this.setState({errorInput: true, isLoading: false})
    }
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

  _displayDBError() {
    if(this.state.errorDB) {
      return(
        <Text styles={styles.errorText}>Une erreur en base de données s'est produite, rééssayez</Text>
      )
    }
  }

  _displayInputError() {
    if(this.state.errorInput) {
      return(
        <Text styles={styles.errorText}>Vous n'avez pas saisi les champs correctement.</Text>
      )
    }
  }

  _displayErrorPosition() {
    if(this.state.errorPosition) {
      return(
        <Text styles={styles.errorText}>Impossible de détecter votre position.</Text>
      )
    }
  }

  _displayEventCreated(){
    return(
      <View style={styles.created_container}>
        <Text style={styles.mainText}>
          Votre évenement à bien été créé, il est désormais visible sur la carte
        </Text>
        <View style={styles.button_container}>
          <Button title='retour' color={Constants.BUTTON_COLOR} onPress={() => this.props.navigation.goBack()} />
        </View>
      </View>
    )
  }

  _displayCreateEvent(){
    const timeOptions= [
      { label: '30min', value:'30'},
      { label: '1h', value:'60' },
      { label: '1h30', value:'90'},
      { label: '2h', value:'120'}
    ]
    return(
      <ScrollView style={styles.main_container}>
        <View style={styles.empty_line}>
        </View>
        {this._displayDBError()}
        {this._displayInputError()}
        {this._displayErrorPosition()}
        <View style={styles.title_container}>
          <Text style={styles.mainText}>Titre : </Text>
          <TextInput
            style={styles.textInput}
            placeholder='Titre de votre évenement...'
            onChangeText={(text) => this._titleTextInputChanged(text)}
          />
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.mainText}>Description : </Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder='Décrivez votre évenement si nécessaire...'
            onChangeText={(text) => this._descriptionTextInputChanged(text)}
            multiline = {true}
            numberOfLines = {11}
          />
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.time_container}>
          <Text style={styles.mainText}>Durée : </Text>
          <View style={styles.switch_container}>
            <SwitchSelector
              backgroundColor={Constants.INPUT_COLOR}
              buttonColor={Constants.BUTTON_COLOR}
              borderColor={Constants.BORDER_COLOR}
              animationDuration={350}
              options={timeOptions}
              initial={0}
              onPress={(time) => this._timeSwitchChanged(time)} />
          </View>
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.button_container}>
          <Button title='Create event' color={Constants.BUTTON_COLOR} onPress={() => this._createEvent()} />
        </View>
        <View style={styles.empty_line}>
        </View>
        {this._displayLoading()}
      </ScrollView>
    )
  }

  render() {
    if(this.state.eventCreated) {
      return(this._displayEventCreated())
    } else {
      return(this._displayCreateEvent())
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  created_container: {
    flex:1,
    backgroundColor: Constants.BACKGROUND_COLOR,
    alignItems:'center'
  },
  empty_line: {
    height:10,
    flex:1
  },
  littleText: {
    fontSize:12,
    color: Constants.TEXT_COLOR
  },
  mainText: {
    flex:1,
    fontSize:15,
    left:10,
    marginTop:10,
    top:4,
    color: Constants.TEXT_COLOR
  },
  bigText: {
    fontWeight:'bold',
    fontSize:22,
    color: Constants.TEXT_COLOR
  },
  title_container: {
    flexDirection:'row',
    height:50
  },
  description_container: {
    height:250
  },
  time_container: {
    flex:1,
    flexDirection:'row',
    height:50
  },
  switch_container:{
    flex:4,
    top:5
  },
  button_container: {
    flex:1,
    height:70,
    top:30,
    alignItems:'center'
  },
  textInput: {
    flex:4,
    borderRadius:10,
    height:50,
    padding:10,
    right:10,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor:Constants.INPUT_COLOR
  },
  descriptionInput: {
    borderRadius:10,
    height:200,
    padding:10,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor:Constants.INPUT_COLOR,
    alignItems: 'center'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize:15,
    color:Constants.BAD_TEXT_COLOR
  }
})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name
  }
}

export default connect(mapStateToProps)(CreateEvent)
