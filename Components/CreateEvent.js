// Components/Logout.js

import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'
import SwitchSelector from 'react-native-switch-selector'

class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.title = ''
    this.description = ''
    this.time = '30'
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
    console.log('eouw')
    //Vérifier que tout est bien rempli, sinon msg erreur dans l'interface
    //récupérer les coordonnées gps, si erreur -> msg erreur
    //Envoyer Nom, Titre, Description, Durée, latitude, longitude dans la table Events
    //Valider

    // ATTENTION PENSER A MODIFIER LUPDATE DU NOM UTILISATEUR DANS L'API POUR QUE CA MODIFIE AUSSI LES EVENEMENTS !
  }

  render() {
    const timeOptions= [
      { label: '30min', value:'30'},
      { label: '1h', value:'60', },
      { label: '1h30', value:'90'},
      { label: '2h', value:'120'}
    ]
    return(
      <ScrollView style={styles.main_container}>
        <View style={styles.empty_line}>
        </View>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor:Constants.BACKGROUND_COLOR
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
  }
})

const mapStateToProps = state => {
  return {
    name: state.name
  }
}

export default connect(mapStateToProps)(CreateEvent)
