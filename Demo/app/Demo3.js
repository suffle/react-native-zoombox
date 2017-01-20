/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Animated,
  Text,
  View
} from 'react-native';

import ZoomBox from 'react-native-zoombox'

class Demo3 extends Component {
  _goBack() {
    this.props.navigator.pop();
  }

  _customAnimation(startValue, endValue) {
    return(Animated.timing(
      startValue,
      {toValue: endValue, duration: 1000}
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.headline}>Custom Animation</Text>
        <ZoomBox style = {styles.zoomBox}
                  customAnimation = {this._customAnimation}>
          <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
            <Text style = {{fontSize: 16, color: 'red', backgroundColor: '#ccc', padding: 10}}>Text Content in a modal</Text>
          </View>
        </ZoomBox>

        <TouchableHighlight
          underlayColor = '#fff'
          onPress = {() => this._goBack()}
          style = {{flex: 0.5, alignSelf: 'center'}}>
            <Text>Go Back</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20
  },

  headline: {
    fontSize: 16
  },

  zoomBox: {
    flex: 1,
    width: 100,
    alignSelf: 'center'
  },

  contain: {
    flex: 1
  },
});

export default Demo3;
