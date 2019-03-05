// Components/topMenu.js

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

class TopMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {clickOnProfile} = this.props
    const {clickOnActionMenu} = this.props
    return(
      <View style={styles.topMenu_container}>
        <TouchableOpacity
          style={styles.left_container}
          onPress={() => clickOnActionMenu()}>
          <Image style={styles.img_icon} source={require('../Images/ic_list.png')} />
        </TouchableOpacity>
        <View style={styles.middle_container}>
          <Text style={styles.mainText}>MeetMapLogo</Text>
        </View>
        <TouchableOpacity
          style={styles.right_container}
          onPress={() => clickOnProfile()}>
          <Image style={styles.img_icon} source={require('../Images/ic_profil.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topMenu_container: {
    flexDirection:'row',
    borderWidth:1,
    height:50,
    borderRadius:5,
    borderColor:'#70CF70'
  },
  img_icon: {
    height:50,
    width:50,
    borderWidth:1,
    borderRadius:5,
    borderColor:'white',
  },
  left_container: {
    backgroundColor:'antiquewhite',
    height:50
  },
  middle_container: {
    backgroundColor:'antiquewhite',
    flex:1,
    height:50,
    alignItems:'center'
  },
  right_container: {
    backgroundColor:'antiquewhite',
    height:50
  },
  mainText: {
    fontWeight:'bold',
    fontSize:20,
  }
})

export default (TopMenu)
