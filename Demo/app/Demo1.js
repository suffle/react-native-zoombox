/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';
import ZoomBox from 'react-native-zoombox';

class Demo1 extends Component {
  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <ZoomBox
          style = {styles.zoomBox}
          backgroundOpacity = {0.5}
          underlayColor = '#0f0'
          hideStatusBar = {false}>
          <Image
            source = {{uri: 'https://placehold.it/800x600'}}
            resizeMode = 'contain'
            style = {styles.contain} />
        </ZoomBox>

        <TouchableHighlight
          onPress = {() => this._goBack()}
          style = {{flex: 1}}>
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
    marginTop: 20
  },

  scene: {
  flex: 1,
  padding: 25
},

row: {
  flex: 1,
  flexDirection: 'row'
},

  zoomBox: {
    flex: 1,
  },

  contain: {
    flex: 1
  },
});

export default Demo1
