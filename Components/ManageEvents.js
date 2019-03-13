// Components/ManageEvents.js

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import AnimFlatList from '../Animations/AnimFlatList'
import Constants from '../helpers/constants'
import { connect } from 'react-redux'

class ManageEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {numTab: 0}
  }

  render() {
    return(
      <View style={styles.main_container}>
        {this._displayTab()}
        <ScrollView style={styles.listContainer}>
          {this._displayList()}
        </ScrollView>
      </View>
    )
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
          onPress={() => this.setState({numTab: 0})}>
          <Image style={styles.me_icon} source={require('../Images/ic_event.png')} />
          <Text style={this._displayStyleTextTab(0)}>
            Mes évenements
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._displayStyleTab(1)}
          onPress={() => this.setState({numTab: 1})}>
          <Image style={styles.me_icon} source={require('../Images/ic_history.png')} />
          <Text style={this._displayStyleTextTab(1)}>
            Mon historique
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this._displayStyleTab(2)}
          onPress={() => this.setState({numTab: 2})}>
          <Image style={styles.me_icon} source={require('../Images/ic_around_me.png')} />
          <Text style={this._displayStyleTextTab(2)}>
            Autour de moi
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  _changeTab(nextTab) {

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

    return(
      <Text>LA LISTE</Text>
    )
  }

  _displayListMyEvents() {
    return(
      <Text>MES EVENEMENTS</Text>
    )
  }

  _displayListMyEventsHisto() {
    return(
      <Text>HISTO MES EVENEMENTS</Text>
    )
  }

  _displayListEventsAround() {
    return(
      <FlatList
          style={styles.list}
          data={this.props.localEvents}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({item}) => this._itemType(item)}/>
    )
  }

  _itemType(item) {
    return(
      <AnimFlatList>
        <View style={styles.item_container}>
          <View style={styles.emptyRow}>
          </View>
          <View style={styles.itemValue_container}>
            <Image style={styles.me_icon_small} source={require('../Images/ic_event.png')} />
            <Text style={styles.mainText}>
              {item.title}
            </Text>
          </View>
        </View>
      </AnimFlatList>
    )
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
  }

})

const mapStateToProps = state => {
  return {
    name: state.setProfile.name,
    localEvents: state.setLocalEvents.localEvents
  }
}

export default connect(mapStateToProps)(ManageEvents)
