// ./Components/LetsGoButton.js

import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, Platform, Linking} from 'react-native'
import Constants from '../helpers/constants'

class LetsGoButton extends React.Component {
  constructor(props) {
    super(props)
  }

  _OpenNavigation(url) {
    Linking.openURL(url);
  }

  render() {
    const {latitude, longitude, label} = this.props
    const url = Platform.select({
        ios: 'http://maps.apple.com/?daddr='+this.props.latitude+','+this.props.longitude,
        android: 'google.navigation:q='+this.props.latitude+'+'+this.props.longitude
      });
    return(
      <TouchableOpacity
        onPress={() => Linking.openURL('http://maps.apple.com/?daddr='+this.props.latitude+','+this.props.longitude)}
      >
        <Image style={styles.img_icon} source={require('../Images/ic_letsgo.png')} />
        <Text style={styles.mainText}>S'y rendre</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor:Constants.BACKGROUND_COLOR,
    padding:10
  },
  img_icon: {
    height:50,
    width:50
  },
  mainText: {
    top:10,
    textAlign:'center'
  }
})

export default (LetsGoButton)
