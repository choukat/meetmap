//Components/MapCustom.js

import React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text} from 'react-native'

class MapCustom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    )
  }
}

export default(MapCustom)
