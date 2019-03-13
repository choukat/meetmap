//Components/MapCustom.js

import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Constants from '../helpers/constants'
import ListMarkers from './ListMarkers'
import MarkerCustom from './MarkerCustom'
import { getLocalEvents } from '../API/meetmapDBApi'
import { StyleSheet, Text, Alert, View, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

class MapCustom extends React.Component {
  constructor(props) {
    super(props)
    this._getLocalEvents = this._getLocalEvents.bind(this)
    this.localEventsLoaded = false
    this.state = {region: {
                            latitude: 0,
                            longitude: 0,
                            latitudeDelta: 0.006450803888412793,
                            longitudeDelta: 0.0061935558915138245,
                          },
                  positionFinded: false,
                  }
    this.timePassed = false
  }

  _findCoordinates() {
      if(!this.state.positionFinded) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const location = JSON.stringify(position);
            this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.006450803888412793,
              longitudeDelta: 0.0061935558915138245,
            }, positionFinded: true
          })
            console.log('new pos')
          },
          error => {console.log(error.message)},
          { enableHighAccuracy: true, timeout: 3000 }
        )
      }
  }

  _getLocalEvents() {
    getLocalEvents(this.state.region.latitude, this.state.region.longitude, this.state.region.latitudeDelta, this.state.region.longitudeDelta)
    .then(data => {
      if(data != null) {
        const actionSetLocalEvents = {type: "SET_LOCALEVENTS", value: data}
        this.props.dispatch(actionSetLocalEvents)
      }
    })
  }

  _displayLocalEvents() {
    return(
        <ListMarkers/>
    )
  }

  _checkUpdate() {
    if(this.timePassed=true) {
      this._getLocalEvents()
      this.timePassed = false
      setTimeout(() => {this.timePassed= true}, 2000)
    }
  }

  componentDidMount() {
    this._findCoordinates()
    this.timer = setInterval(()=> this._getLocalEvents(), 30000)
  }

  render() {
    return(
      <View style={{flex:1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={this.state.region}
          customMapStyle = {mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={ region => {this.setState({region})
                                              this._checkUpdate()}}
        >
          {this._displayLocalEvents()}
        </MapView>

      </View>
    )
  }
}

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

const mapStateToProps = state => {
  return {
    localEvents: state.setLocalEvents.localEvents
  }
}

export default connect(mapStateToProps)(MapCustom)
