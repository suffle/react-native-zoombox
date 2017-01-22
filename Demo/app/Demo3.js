/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Animated,
  ScrollView,
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
    numbersArray = [];
    for (let i = 0; i < 15; i++) {
      numbersArray.push(i);
    }
    return (
      <View style={styles.container}>
        <Text style = {styles.headline}>Custom Animation</Text>
        <ZoomBox style = {styles.zoomBox}
                  customAnimation = {this._customAnimation}>
          <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
            <Text style = {{fontSize: 16, color: 'red', backgroundColor: '#ccc', padding: 10}}>Text Content in a modal</Text>
          </View>
        </ZoomBox>

        <Text style = {styles.headline}>ScrollView inside ZoomBox</Text>
        <ZoomBox style = {[styles.zoomBox, { flex: 0, height: 100 }]}>
          <ScrollView style = {{ flex: 1, backgroundColor: '#ddd' }}>
            {numbersArray.map((item) => {
              return (
                <View key={item} style={{ padding: 20 }}>
                  <Text style={styles.headline}> Text {item} inside a ScrollView</Text>
                </View>
               )
             })
            }

          </ScrollView>
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
