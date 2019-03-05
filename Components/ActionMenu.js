// Components/ActionMenu.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {displayCreateEventPage, displayManageEventsPage, displayParametersPage} = this.props
    return(
      <View style={styles.main_container}>
        <TouchableOpacity
          onPress={() => displayCreateEventPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_add.png')} />
          <Text style={styles.textItemMenu}>Créer un évenement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => displayManageEventsPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_manage.png')} />
          <Text style={styles.textItemMenu}>Gérer mes évenements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => displayParametersPage()}
          style={styles.menuItem_container}>
          <Image style={styles.am_icon} source={require('../Images/ic_parameters.png')} />
          <Text style={styles.textItemMenu}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    alignItems:'center'
  },
  menuItem_container: {
    top:10,
    borderColor: 'white',
    borderWidth: 1,
    height:50,
    borderRadius: 10,
    width:230,
    backgroundColor:'beige',
    flexDirection:'row'
  },
  textItemMenu: {
    fontSize:15,
    textAlign:'center',
    marginTop:10,
    left:20,
    top:4
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
