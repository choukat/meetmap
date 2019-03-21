// ./Components/MarkerCustom.js

import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Constants from '../helpers/constants'

class MarkerCustom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {title, IDEvent} = this.props
    return(
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.eventText}>{this.props.title}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: Constants.BUTTON_COLOR,
    padding: 2,
    borderRadius: 3,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 0.5,
  },
  eventText: {
    color: Constants.BACKGROUND_COLOR,
    fontSize: 10,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: Constants.BUTTON_COLOR,
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: Constants.BORDER_COLOR,
    alignSelf: 'center',
    marginTop: -0.5,
  },
})

export default(MarkerCustom)
