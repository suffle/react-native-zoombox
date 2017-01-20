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
        <Text style = {styles.headline}>Simple ZoomBox without customization</Text>
        <ZoomBox style = {styles.zoomBox}>
          <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
            <Text style = {{fontSize: 16, color: 'red', backgroundColor: '#ccc', padding: 10}}>Text Content in a modal</Text>
          </View>
        </ZoomBox>

        <Text style = {styles.headline}>Custom Background Color and Opacity</Text>
        <ZoomBox
          style = {styles.zoomBox}
          backgroundColor = '#fff'
          backgroundOpacity = {0.5}>
          <Image
            source = {{uri: 'https://unsplash.it/300/200'}}
            resizeMode = 'contain'
            style = {styles.contain} />
        </ZoomBox>

        <Text style = {styles.headline}>Visible Status Bar</Text>
        <ZoomBox
          style = {styles.zoomBox}
          hideStatusBar = {false}>
          <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
            <Text style = {{fontSize: 16, color: 'blue', backgroundColor: '#ccc', padding: 10}}>Text Content in a modal</Text>
          </View>
        </ZoomBox>

        <TouchableHighlight
          onPress = {() => this._goBack()}
          underlayColor = '#fff'
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

export default Demo1
