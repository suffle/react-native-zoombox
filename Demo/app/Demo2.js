/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import ZoomBox from 'react-native-zoombox';

class Demo2 extends Component {
  _goBack() {
    this.props.navigator.pop();
  }

  _customHeader(closeModal) {
    return (
        <TouchableHighlight onPress = {closeModal}>
          <Text style = {styles.closeButton}>Close</Text>
        </TouchableHighlight>
    )
  }

  _customContent() {
    return(
      <View style = {[styles.container, {alignItems: 'center', marginTop: 0}]}>
        <Text style = {styles.headline}>The content of the modal differs from the touchable content</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.headline}>Swipe to close</Text>
        <ZoomBox
          style = {styles.zoomBox}
          swipeToClose = {true}>
          <Image
            source = {{uri: 'https://placehold.it/800x600'}}
            resizeMode = 'contain'
            style = {styles.contain} />
        </ZoomBox>

        <Text style = {styles.headline}>Custom header</Text>
        <ZoomBox
          style = {styles.zoomBox}
          customHeader = {this._customHeader}>
          <Image
            source = {{uri: 'https://placehold.it/800x600'}}
            resizeMode = 'contain'
            style = {styles.contain} />
        </ZoomBox>

        <Text style = {styles.headline}>Custom content</Text>
        <ZoomBox
          style = {styles.zoomBox}
          customContent = {this._customContent}>
          <Image
            source = {{uri: 'https://placehold.it/800x600'}}
            resizeMode = 'contain'
            style = {styles.contain} />
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

  closeButton: {
  fontSize: 16,
  color: 'red',
  lineHeight: 40,
  textAlign: 'center',
  alignSelf: 'flex-end',
  width: 60,
  marginRight: 20,
  marginTop: 10,
  borderWidth: 1,
  borderColor: 'red'
}
});

export default Demo2;
