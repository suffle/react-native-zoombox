/**
 * A component with zoomable content
 * @flow
 */

import React, { Component, Children, cloneElement } from 'react';
import {
  View,
  Animated,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Overlay from './overlay';

class ZoomBox extends Component {

  constructor(props) {
    super(props);

    this.setLightboxProps = this.setLightboxProps.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.closeLightboxAnimated = this.closeLightboxAnimated.bind(this);
    this.getAnimation = this.getAnimation.bind(this);

    this.state = {
      isOpen: false,
      origin: {
        width: 0,
        height: 0,
        posX: 0,
        posY: 0
      },
      layoutOpacity: new Animated.Value(1)
    }
  }

  getContent() {
    if (this.props.customContent) {
      return this.props.customContent();
    } else if (this.props.inModalProps) {
      return cloneElement(
        Children.only(this.props.children),
        this.props.openProps
      )
    } else {
      return this.props.children;
    }
  }

  setLightboxProps() {
    return {
      isOpen: this.state.isOpen,
      origin: this.state.origin,
      content: this.getContent(),
      onCloseBefore: this.closeLightboxAnimated,
      onCloseAfter: this.closeLightbox,
      backgroundColor: this.props.backgroundColor,
      backgroundOpacity: this.props.backgroundOpacity,
      hideStatusBar: this.props.hideStatusBar,
      getCustomHeader: this.props.customHeader,
      customContent: !!this.props.customContent,
      swipeToClose: this.props.swipeToClose,
      getAnimation: this.getAnimation
    }
  }

  openLightbox() {
    this._rootView.measure((origX, origY, width, height, posX, posY) => {
      this.setState({
        origin: {
          width,
          height,
          posX,
          posY
        }
      }, () => {
        this.setState({ isOpen: true });
        if (this.props.customContent) {
          this.getAnimation(this.state.layoutOpacity, 0).start();
        } else {
          this.state.layoutOpacity.setValue(0);
        }
      });
    });
  }

  getAnimation(startValue, endValue) {
    if (this.props.customAnimation) {
      return this.props.customAnimation(startValue, endValue);
    } else {
      return Animated.spring(
        startValue,
        { toValue: endValue, tension: 30, friction: 7 }
      );
    }
  }

  closeLightboxAnimated() {
    if (this.props.customContent) {
        this.getAnimation(this.state.layoutOpacity, 1).start();
    }
  }

  closeLightbox() {
    this.state.layoutOpacity.setValue(1);
    this.setState({isOpen: false});
  }

  render() {
    return (
      <View
        ref = {(component) => {this._rootView = component; }}
        style = {this.props.style}
        onLayout={() => {}}>
        <Animated.View style = {{opacity: this.state.layoutOpacity, flex: 1}}>
          <TouchableHighlight
            style = {{flex: 1}}
            onPress = {this.openLightbox}
            underlayColor = {this.props.underlayColor}>
            {this.props.children}
          </TouchableHighlight>
        </Animated.View>
        <Overlay {...this.setLightboxProps()} />
      </View>
    );
  }
}

ZoomBox.defaultProps = {
  backgroundColor: '#000',
  backgroundOpacity: 1,
  hideStatusBar: true,
  getCustomHeader: null,
  underlayColor: 'transparent',
  swipeToClose: false,
  inModalProps: null
}

module.exports = ZoomBox;
