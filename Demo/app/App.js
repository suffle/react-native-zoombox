/**
 * Zoom-Box example app
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Navigator,
  Text,
  View
} from 'react-native';
import Home from './Home';
import Demo1 from './Demo1';
import Demo2 from './Demo2';
import Demo3 from './Demo3';

class App extends Component {
  renderScene(route, navigator) {
    switch (route.name) {
      case 'home':
        return <Home navigator={navigator} />
      case 'demo1':
        return <Demo1 navigator={navigator} />
      case 'demo2':
        return <Demo2 navigator={navigator} />
      case 'demo3':
        return <Demo3 navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'home' }}
        renderScene={this.renderScene} />
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

export default App;
