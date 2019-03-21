// Components/Event.js

import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, ActivityIndicator } from 'react-native'
import Constants from '../helpers/constants'
import LetsGoButton from './LetsGoButton'
import SwitchSelector from 'react-native-switch-selector'
import {updateEvent} from '../API/meetmapDBApi'
import { connect } from 'react-redux'

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: false, errorDB: false, errorInput: false, errorPosition: false, eventCreated: false, edit:false}
    this.title = this.props.event.title
    this.description = this.props.event.description
    this.time = this.props.event.time
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

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _displayEditButton() {
    if(this.props.name == this.props.event.name) {
      return(
        <TouchableOpacity style={styles.edit_container}
                          onPress= {() => this.setState({edit: !this.state.edit})}>
          <Image style={styles.edit_icon} source={require('../Images/ic_edit_profile.png')} />
          <Text style={styles.iconText}>Edit</Text>
        </TouchableOpacity>
      )
    }
  }

  _displayTitle() {
    if(this.state.edit) {
      return(
        <View style={styles.title_container}>
          <Text style={styles.mainText}>Titre : </Text>
          <TextInput
            style={styles.textInput}
            placeholder='Titre de votre évenement...'
            defaultValue={this.props.event.title}
            onChangeText={(text) => this._titleTextInputChanged(text)}
          />
        </View>
      )
    } else {
      return(
        <View style={styles.title_container}>
          <Text style={styles.mainText}>Titre : {this.props.event.title}</Text>
          <Text style={styles.littleText}>par {this.props.name}</Text>
        </View>
      )
    }
  }

  _displayDescription() {
    if(this.state.edit) {
      return(
        <View style={styles.description_container}>
          <Text style={styles.mainText}>Description : </Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder='Décrivez votre évenement si nécessaire...'
            onChangeText={(text) => this._descriptionTextInputChanged(text)}
            defaultValue={this.props.event.description}
            multiline = {true}
            numberOfLines = {11}
          />
        </View>
      )
    } else {
      return(
        <View style={styles.description_container}>
          <View style={styles.description_title}>
            <Text style={styles.mainText}>Description : </Text>
          </View>
          <ScrollView style={styles.description_text}>
            <Text>{this.props.event.description}</Text>
          </ScrollView>
        </View>
      )
    }
  }

  _getInitialTimeValue(value) {
    switch (value) {
      case '00:30:00' :
        return(0)
      case '01:00:00' :
        return(1)
      case '01:30:00' :
        return(2)
      case '02:00:00' :
        return(3)
      default:
        return (0)
    }
  }

  _getTimeValueToDisplay(value) {
    switch(value) {
      case '00:30:00' :
        return('30 minutes')
      case '01:00:00' :
        return('1 heure')
      case '01:30:00' :
        return('1 heure 30 minutes')
      case '02:00:00' :
        return('2 heures')
      default:
        return (0)
    }
  }

  _displayTime() {
    if(this.state.edit) {
      const timeOptions= [
        { label: '30min', value:'00:30:00'},
        { label: '1h', value:'00:60:00' },
        { label: '1h30', value:'01:30:00'},
        { label: '2h', value:'02:00:00'}
      ]

      const initialValue = this._getInitialTimeValue(this.props.event.time)

      return(
        <View style={styles.time_container}>
          <Text style={styles.mainText}>Durée : </Text>
          <View style={styles.switch_container}>
            <SwitchSelector
              backgroundColor={Constants.INPUT_COLOR}
              buttonColor={Constants.BUTTON_COLOR}
              borderColor={Constants.BORDER_COLOR}
              animationDuration={350}
              options={timeOptions}
              initial={initialValue}
              onPress={(time) => this._timeSwitchChanged(time)} />
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.time_container}>
          <Text style={styles.mainText}>Durée : {this._getTimeValueToDisplay(this.props.event.time)}</Text>
        </View>
      )
    }
  }

  _displayButton() {
    if(this.state.edit) {
      return(
        <View style={styles.button_container}>
          <Button title='Edit event' color={Constants.BUTTON_COLOR} onPress={() => this._updateEvent()} />
        </View>
      )
    } else {
      return(
        <View style={styles.button_container}>
          <LetsGoButton
            label={this.props.event.title}
            latitude= {this.props.event.latitude}
            longitude= {this.props.event.longitude}
          />
        </View>
      )
    }
  }

  _updateEvent() {
    console.log('update')
    this.setState({isLoading: true, inputError: false, errorDB:false})
    if(this.state.edit && this.props.name != '' && this.title != '' && this.description != '' && this.time != '') {
      updateEvent(this.props.event.ID, this.title, this.time, this.description)
      .then(data => {
          console.log(data)
          if(data.result == -1) {
            this.setState({isLoading: false, edit: false})
          } else {
            this.setState({errorDB: true, isLoading: false})
          }
      })
    } else {
      this.setState({errorInput: true, isLoading: false})
    }
  }

  render() {
    return(
      <ScrollView style={styles.main_container}>
        {this._displayEditButton()}
        <View style={styles.empty_line}>
        </View>
        {this._displayTitle()}
        {this._displayDescription()}
        <View style={styles.empty_line}>
        </View>
        {this._displayTime()}
        <View style={styles.empty_line}>
        </View>
        <View style={styles.empty_line}>
        </View>
        {this._displayButton()}
        {this._displayLoading()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor:Constants.BACKGROUND_COLOR,
    padding:10
  },
  empty_line: {
    height:10,
    flex:1
  },
  edit_container: {
    flexDirection:'row',
    alignSelf:'flex-end',
    justifyContent:'flex-end'
  },
  edit_icon: {
    height:20,
    width:20
  },
  iconText: {
    fontSize:12,
    color: Constants.TEXT_COLOR
  },
  littleText: {
    fontSize:12,
    color: Constants.TEXT_COLOR,
    top:20,
    textAlign:'right'
  },
  mainText: {
    flex:1,
    fontSize:20,
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
  description_title: {
    height:50
  },
  description_text: {
    height:200,
    backgroundColor: Constants.INFO_BACKGROUND_COLOR
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
  time_container: {
    flex:1,
    flexDirection:'row',
    height:50
  },
  button_container: {
    alignItems:'center',
    height:80
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
  textInput: {
    borderRadius:10,
    height:50,
    padding:10,
    right:10,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor:Constants.INPUT_COLOR,
    flex:3
  },
  img_icon: {
    height:50,
    width:50
  },
  time_container: {
    flex:1,
    flexDirection:'row',
    height:50
  },
  switch_container:{
    flex:3,
    top:10
  }
})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name,
    event: state.setEvent.event
  }
}

export default connect(mapStateToProps)(Event)
