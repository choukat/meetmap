import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Constants from '../helpers/constants'
import MarkerCustom from './MarkerCustom'
import { getLocalEvents } from '../API/meetmapDBApi'
import { StyleSheet, Text, Alert, View, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

class ListMarkers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {region: {
                            latitude: 0,
                            longitude: 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
  }

  _renderMarkers() {
    const {displayEventDetail} = this.props
    return this.props.localEvents.map((item) => {
      return(
        <MapView.Marker
          key={item.ID}
          coordinate={{latitude:Number(item.latitude), longitude: Number(item.longitude)}}
          onPress={() => displayEventDetail(item)}>
          <MarkerCustom
            title={item.title}
            IDEvent={item.ID}/>
        </MapView.Marker>
      )
    })
  }

  render() {
    return(
      <View>
      {this._renderMarkers()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    localEvents: state.setLocalEvents.localEvents
  }
}

export default connect(mapStateToProps)(ListMarkers)
