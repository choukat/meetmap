// Components/ManageEvents.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

class ManageEvents extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.mainText}>LIST EVENEMENT par {this.props.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor:'#DFDFDF',
    alignItems:'center'
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20
  }
})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name
  }
}

export default connect(mapStateToProps)(ManageEvents)
