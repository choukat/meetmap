// Components/Event.js

import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'

class Event extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ScrollView style={styles.main_container}>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.title_container}>
          <Text style={styles.mainText}>Titre : {this.props.event.title}</Text>
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.mainText}>Description : </Text>
          <Text>{this.props.event.description}</Text>
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.time_container}>
          <Text style={styles.mainText}>Durée : {this.props.event.time}</Text>
        </View>
        <View style={styles.empty_line}>
        </View>
        <View style={styles.empty_line}>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor:Constants.BACKGROUND_COLOR
  },
  empty_line: {
    height:10,
    flex:1
  },
  littleText: {
    fontSize:12,
    color: Constants.TEXT_COLOR
  },
  mainText: {
    flex:1,
    fontSize:15,
    left:10,
    marginTop:10,
    top:4,
    color: Constants.TEXT_COLOR
  },
  bigText: {
    fontWeight:'bold',
    fontSize:22,
    color: Constants.TEXT_COLOR
  },
  title_container: {
    flexDirection:'row',
    height:50
  },
  description_container: {
    height:250
  },
  time_container: {
    flex:1,
    flexDirection:'row',
    height:50
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name,
    event: state.setEvent.event
  }
}

export default connect(mapStateToProps)(Event)
