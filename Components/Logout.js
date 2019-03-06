// Components/Logout.js

import React from 'react'
import { StyleSheet, Text, View, Button} from 'react-native'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'

class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  _logout() {
    const actionLogout = {type: "LOGOUT"}
    this.props.dispatch(actionLogout)
    this.props.navigation.goBack()
  }

  render() {
    return(
      <View style={styles.main_container}>
        <View style={styles.lo_text_container}>
          <Text style={styles.mainText}>Vous allez vous deconnecter, ètes vous sur ? </Text>
        </View>
        <View style={styles.button_container}>
          <View style={styles.yesno_container}>
            <Button title='Oui' color={Constants.BUTTON_COLOR} onPress={() => this._logout()} />
          </View>
          <View style={styles.yesno_container}>
            <Button title='Non' color={Constants.BUTTON_COLOR} onPress={() => this.props.navigation.goBack()} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor:Constants.BACKGROUND_COLOR,
    alignItems:'center'
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
    color: Constants.TEXT_COLOR
  },
  lo_text_container: {
    alignItems:'center',
    margin:20
  },
  button_container: {
    margin:20,
    flexDirection: 'row'
  },
  yesno_container: {
    margin:10,
    flex:1
  }
})

const mapStateToProps = state => {
  return {
    logged: state.logged
  }
}

export default connect(mapStateToProps)(Logout)
