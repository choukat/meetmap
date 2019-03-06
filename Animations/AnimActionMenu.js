// Animations/AnimActionMenu.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class AnimActionMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount() {
    Animated.spring(
      this.state.positionLeft,
      {
        toValue: 0,
        speed: 50,
        bounciness: 3
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ right: this.state.positionLeft }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default AnimActionMenu
