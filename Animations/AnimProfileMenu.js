// Animations/AnimProfileMenu.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class AnimProfileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      positionRight: new Animated.Value(Dimensions.get('window').width)
    }
  }

  componentDidMount() {
    Animated.spring(
      this.state.positionRight,
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
        style={{ left: this.state.positionRight }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default AnimProfileMenu
