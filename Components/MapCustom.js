//Components/MapCustom.js

import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Constants from '../helpers/constants'
import { StyleSheet, Text, Alert, View, Image, TouchableOpacity} from 'react-native'

class MapCustom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {latitude:0, longitude:0, positionFinded: false}
  }

  _findCoordinates() {
    if(!this.state.positionFinded) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position);
          this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude, positionFinded: true })
          console.log('new pos')
        },
        error => {console.log(error.message)},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  };

  _goToMyPosition() {
    this.setState({positionFinded: false})
  }

  render() {
    this._findCoordinates()
    return(
      <View style={{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          customMapStyle = {mapStyle}
          showsUserLocation={true}
        />
        <TouchableOpacity
          style={styles.positionIcon_container}
          onPress={() => this._goToMyPosition()}>
          <Image style={styles.positionIcon_image} source={require('../Images/ic_position.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  positionIcon_container: {
    position: 'absolute',
    right:20,
    bottom: 20,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 3,
    borderRadius: 25,
    width:40,
    height:40
  },
  positionIcon_image: {
    height:50,
    width:50,
    bottom:8,
    right:8
  }
})

const mapStyle =
[
  {
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#5f9ea0"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e0ffff"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#5f9ea0"
      },
      {
        "weight": 3
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#40e0d0"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#5f9ea0"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#afeeee"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#40e0d0"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e0ffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#40e0d0"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#00ffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#40e0d0"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default(MapCustom)
