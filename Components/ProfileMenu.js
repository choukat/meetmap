// Components/ProfileMenu.js

import React from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

class ProfileMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {displayLogoutPage, displayEditProfilePage} = this.props
    return(
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={require('../Images/ic_tag_faces.png')} />
        </View>
        <View style={styles.infos_container}>
          <Text style={styles.textName}>{this.props.name}</Text>
          <Text style={styles.textMail}>{this.props.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuItem_container}
          onPress={() => displayEditProfilePage()}>
          <Text style={styles.textItemMenu}>Modifier profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem_container}
          onPress={() => displayLogoutPage()}>
          <Text style={styles.textItemMenu}>Se deconnecter</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    alignItems:'center'
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
    top:0,
    height:50,
    borderRadius: 10,
    width:180,
    backgroundColor:"bisque"
  },
  menuItem_container: {
    top:10,
    borderColor: 'white',
    borderWidth: 1,
    height:50,
    borderRadius: 10,
    width:180,
    backgroundColor:"beige"
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5
  },
  textMail: {
    fontSize: 14,
    marginLeft: 5,
    fontStyle: 'italic',
    color: 'grey'
  },
  textItemMenu: {
    fontSize:18,
    textAlign:'center',
    marginTop:10
  }
})

const mapStateToProps = state => {
  return {
    name: state.name,
    email: state.email
  }
}

export default connect(mapStateToProps)(ProfileMenu)
