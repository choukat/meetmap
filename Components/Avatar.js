// Components/Avatar.js

import React from 'react'
import ImagePicker from 'react-native-image-picker'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import {uploadImg} from '../API/fileTransfertAPI'

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this._avatarClicked = this._avatarClicked.bind(this)
    this.state = { avatarImg: require('../Images/ic_tag_faces.png') }
  }

  _avatarClicked() {
    // Ici nous appellerons la librairie react-native-image-picker pour récupérer un avatar
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri)
        let requireSource = {uri: response.uri}
        console.log(requireSource.toString())
        this.setState({avatarImg: requireSource})
        const image = {
          uri: response.uri,
          type: 'image/jpeg',
          name: 'myImage' + '-' + Date.now() + '.jpg',
        }
        uploadImg(image).then(data => {
          console.log(data)
        })
      }
    })
  }

  render() {
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
          <Image style={styles.avatar} source={this.state.avatarImg} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})



export default (Avatar)
