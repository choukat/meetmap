// Components/ManageEvents.js

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import AnimFlatList from '../Animations/AnimFlatList'
import Event from './Event'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'
import { getMyEvents, getMyHisto, getLocalEvents } from '../API/meetmapDBApi'

class ManageEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {numTab: 0, isLoading: false, myEvents: [], myLocalEvents: [], myHisto: []}
    this.latitudeDelta = 0.006450803888412793
    this.longitudeDelta = 0.0061935558915138245
    this.firstTime = true
  }

  render() {
    return(
      <View style={styles.main_container}>
        {this._displayTab()}
        <ScrollView style={styles.listContainer}>
          {this._displayList()}
        </ScrollView>
        {this._displayLoading()}
      </View>
    )
  }

  componentDidMount() {
    if(this.firstTime) {
      this._getMyEvents()
      this.firstTime = false
    }
  }

  _displayStyleTab(numTab) {
    if(this.state.numTab == numTab) {
      return {
        flex:1,
        height:50,
        backgroundColor: Constants.BUTTON_COLOR,
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
      }
    } else {
      return {
        flex:1,
        height:50,
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        borderColor: Constants.BUTTON_COLOR,
        borderWidth:1
      }
    }
  }

  _displayStyleTextTab(numTab) {
    if(this.state.numTab == numTab) {
      return {
        fontSize:14,
        color:Constants.INPUT_COLOR
      }
    } else {
      return {
        fontSize:14,
        color:Constants.TEXT_COLOR
      }
    }
  }

  _displayTab() {
    return(
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={this._displayStyleTab(0)}
          onPress={() => this._getMyEvents()}>
          <Image style={styles.me_icon} source={require('../Images/ic_event.png')} />
          <Text style={this._displayStyleTextTab(0)}>
            Mes évenements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._displayStyleTab(1)}
          onPress={() => this._getMyHisto()}>
          <Image style={styles.me_icon} source={require('../Images/ic_history.png')} />
          <Text style={this._displayStyleTextTab(1)}>
            Mon historique
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._displayStyleTab(2)}
          onPress={() => this._getLocalEvents()}>
          <Image style={styles.me_icon} source={require('../Images/ic_around_me.png')} />
          <Text style={this._displayStyleTextTab(2)}>
            Autour de moi
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  _displayList() {
    switch (this.state.numTab) {
      case 0 :
        return(this._displayListMyEvents())
      case 1 :
        return(this._displayListMyEventsHisto())
      case 2 :
        return(this._displayListEventsAround())
      default:
        return(this._displayListMyEvents())
    }

    return(<Text>LA LISTE</Text>)
  }

  _getMyEvents() {
    this.setState({isLoading: true, numTab: 0})
    getMyEvents(this.props.name).then(data => {
      console.log(data)
      if ( data != null ) {
        this.setState({myEvents : data, isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    })
  }

  _getMyHisto() {
    this.setState({isLoading: true, numTab: 1})
    getMyHisto(this.props.name).then(data => {
      console.log(data)
      if ( data != null ) {
        this.setState({myHisto : data, isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    })
  }

  _getLocalEvents() {
    this.setState({isLoading: true, numTab: 2})
    Geolocation.getCurrentPosition(
      position => {
        getLocalEvents(position.coords.latitude, position.coords.longitude, this.latitudeDelta, this.longitudeDelta).then(data => {
            console.log(data)
            if(data != null) {
              this.setState({myLocalEvents: data, isLoading: false})
            } else {
              this.setState({isLoading: false})
            }
        })
        console.log('Position get')
      },
      error => {
        console.log(error.message)
        this.setState({isLoading: false})},
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  _displayListMyEvents() {
    return(
      <FlatList
        style={styles.list}
        data={this.state.myEvents}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({item}) => this._itemType(item)}/>
    )
  }

  _displayListMyEventsHisto() {
    return(
      <FlatList
        style={styles.list}
        data={this.state.myHisto}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({item}) => this._itemType(item)}/>
    )
  }

  _displayListEventsAround() {
    return(
      <FlatList
        style={styles.list}
        data={this.state.myLocalEvents}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({item}) => this._itemType(item)}/>
    )
  }

  _displayEventDetail(eventItem) {
    const actionSetEvent = {type: "SET_EVENT", value: eventItem}
    this.props.dispatch(actionSetEvent)
    this.props.navigation.navigate("Event")
  }

  _itemType(item) {
    return(
      <AnimFlatList>
        <TouchableOpacity
          style={styles.item_container}
          onPress={() => this._displayEventDetail(item)}>
          <View style={styles.emptyRow}>
          </View>
          <View style={styles.itemValue_container}>
            <Image style={styles.me_icon_small} source={require('../Images/ic_event.png')} />
            <Text style={styles.mainText}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </AnimFlatList>
    )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    backgroundColor:Constants.BACKGROUND_COLOR,
    padding:5
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
    color:Constants.TEXT_COLOR,
    left:10
  },
  tabContainer: {
    height:50,
    flexDirection:'row'
  },
  listContainer: {
    flex:1,
    borderColor: Constants.BORDER_COLOR,
    borderWidth: 1
  },
  me_icon: {
    top:3,
    width: 30,
    height: 30
  },
  me_icon_small: {
    top:3,
    left:3,
    width:20,
    height:20
  },
  list: {
    flex: 1
  },
  item_container: {
    height:60,
  },
  emptyRow: {
    height:3,
    backgroundColor: Constants.BORDER_COLOR
  },
  itemValue_container: {
    height:50,
    flexDirection: 'row'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }

})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name,
  }
}

export default connect(mapStateToProps)(ManageEvents)
