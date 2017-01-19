/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class Home extends Component {

  _navigate(name) {
    this.props.navigator.push({ name })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress = {() => this._navigate('demo1')}>
          <Text>Demo 1</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress = {() => this._navigate('demo2')}>
          <Text>Demo 2</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress = {() => this._navigate('demo3')}>
          <Text>Demo 3</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Home;
