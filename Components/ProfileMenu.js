// Components/ProfileMenu.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'
import AnimProfileMenu from '../Animations/AnimProfileMenu'

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {displayLogoutPage, displayEditProfilePage} = this.props
    return(
      <AnimProfileMenu>
      <View style={styles.main_container}>
        <View style={styles.menuBar_container}>
        </View>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={require('../Images/ic_tag_faces.png')} />
        </View>
        <View style={styles.infos_container}>
          <Text style={styles.textName}>{this.props.name}</Text>
          <Text style={styles.textMail}>{this.props.email}</Text>
        </View>
        <View style={styles.menuBar_container}>
        </View>
        <TouchableOpacity
          style={styles.menuItem_container}
          onPress={() => displayEditProfilePage()}>
          <Text style={styles.textItemMenu}>Modifier profil</Text>
        </TouchableOpacity>
        <View style={styles.menuBar_container}>
        </View>
        <TouchableOpacity
          style={styles.menuItem_container}
          onPress={() => displayLogoutPage()}>
          <Text style={styles.textItemMenu}>Se deconnecter</Text>
        </TouchableOpacity>
        <View style={styles.menuBar_container}>
        </View>
      </View>
      </AnimProfileMenu>
    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    alignItems:'center',
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  avatar_container: {
    padding:10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#808080',
    borderWidth: 2
  },
  infos_container: {
    height:50,
    width:170,
    borderRadius:5,
    bottom:5,
    borderColor:Constants.BORDER_COLOR,
    borderWidth:1,
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  menuBar_container: {
    height:3,
    width:180,
    backgroundColor:Constants.BORDER_COLOR
  },
  menuItem_container: {
    height:50,
    width:180,
    backgroundColor:Constants.BACKGROUND_COLOR,
    flexDirection:'row'
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    color: Constants.TEXT_COLOR,
    textAlign:'center'
  },
  textMail: {
    fontSize: 12,
    marginLeft: 5,
    fontStyle: 'italic',
    color: Constants.TEXT_COLOR,
    textAlign:'center'
  },
  textItemMenu: {
    fontSize:15,
    textAlign:'center',
    marginTop:10,
    left:20,
    top:4,
    color: Constants.TEXT_COLOR
  }
})

const mapStateToProps = state => {
  return {
    name: state.name,
    email: state.email
  }
}

export default connect(mapStateToProps)(ProfileMenu)
