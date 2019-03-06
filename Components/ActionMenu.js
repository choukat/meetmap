// Components/ActionMenu.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Constants from '../helpers/constants'

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {displayCreateEventPage, displayManageEventsPage, displayParametersPage} = this.props
    return(
      <View style={styles.main_container}>
        <View style={styles.menuBar_container}>
        </View>
        <TouchableOpacity
          onPress={() => displayCreateEventPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_add.png')} />
          <Text style={styles.textItemMenu}>Créer un évenement</Text>
        </TouchableOpacity>
        <View style={styles.menuBar_container}>
        </View>
        <TouchableOpacity
          onPress={() => displayManageEventsPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_manage.png')} />
          <Text style={styles.textItemMenu}>Gérer mes évenements</Text>
        </TouchableOpacity>
        <View style={styles.menuBar_container}>
        </View>
        <TouchableOpacity
          onPress={() => displayParametersPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_parameters.png')} />
          <Text style={styles.textItemMenu}>Paramètres</Text>
        </TouchableOpacity>
        <View style={styles.menuBar_container}>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    alignItems:'center'
  },
  menuBar_container: {
    height:3,
    width:220,
    backgroundColor:Constants.BORDER_COLOR
  },
  menuItem_container: {
    height:50,
    width:220,
    backgroundColor:Constants.BACKGROUND_COLOR,
    flexDirection:'row'
  },
  textItemMenu: {
    fontSize:15,
    textAlign:'center',
    marginTop:10,
    left:20,
    top:4,
    color: Constants.TEXT_COLOR
  },
  am_icon: {
    top:10,
    left:10,
    right:10,
    width: 30,
    height: 30
  }
})

export default (ProfileMenu)
