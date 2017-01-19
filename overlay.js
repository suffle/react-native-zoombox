/**
 * An animated lightbox component
 * @flow
 */

import React, { Component, Children, cloneElement } from 'react';
import {
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
  StatusBar,
  StyleSheet,
  PanResponder
} from 'react-native';

const VIEWPORT_HEIGHT = Dimensions.get('window').height,
      VIEWPORT_WIDTH = Dimensions.get('window').width,
      STATUSBAR_HEIGHT = 20,
      DRAG_CLOSE_THRESHOLD = 150

class Overlay extends Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isAnimating: false,
      isPanning: false,
      pan: new Animated.ValueXY(0, 0),
      openVal: new Animated.Value(0),
      target: {
        posX: 0,
        posY: 0,
        opacity: 1
      }
    }
  }

  componentWillMount() {
    if (this.props.swipeToClose) {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => !this.state.isAnimating,
        onStartShouldSetPanResponderCapture: (e, gestureState) => !this.state.isAnimating,
        onMoveShouldSetPanResponder: (e, gestureState) => !this.state.isAnimating,
        onMoveShouldSetPanResponderCapture: (e, gerstureState) => !this.state.isAnimating,

        onPanResponderGrant: (e, gestureState) => {
          this.state.pan.setValue(0, 0);
          this.setState({ isPanning: true });
        },

        onPanResponderMove: Animated.event([
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y
          }
        ]),

        onPanResponderTerminationRequest: (e, gestureState) => true,
        onPanResponderRelease: (e, gestureState) => {
          if (Math.abs(gestureState.dy) > DRAG_CLOSE_THRESHOLD || Math.abs(gestureState.dx) > DRAG_CLOSE_THRESHOLD) {
            this.setState({
              isPanning: false,
              target: {
                posX: gestureState.dx,
                posY: gestureState.dy,
                opacity: 1 - (Math.max(Math.abs(gestureState.dx), Math.abs(gestureState.dy)) / VIEWPORT_HEIGHT)
              }
            });

            this.closeModal();
          } else {
            this.props.getAnimation(this.state.pan, 0).start(() => this.setState({ isPanning: false }));
          }
        }
      });
    }
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.openModal();
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.isOpen != props.isOpen && props.isOpen) {
      this.openModal();
    }
  }

  openModal() {
    let newState = {
      isAnimating: true,
      target: {
        opacity: 1,
        posX: 0,
        posY: 20
      }
    }

    if (this.props.hideStatusBar) {
      StatusBar.setHidden(true, 'fade');
      newState.target.posY = 0;
    }

    this.state.pan.setValue(0, 0);
    this.setState(newState);
    this.props.getAnimation(this.state.openVal, 1).start(() => this.setState({ isAnimating: false }))
  }

  closeModal() {
    StatusBar.setHidden(false, 'fade');
    this.setState({ isAnimating: true });
    if (this.props.customContent) {
          this.props.onCloseBefore();
    }

    this.props.getAnimation(this.state.openVal, 0).start(() => {
      this.setState({ isAnimating: false });
      this.props.onCloseAfter();
    })
  }

  getBackgroundView(additionalStyles) {
    let backgroundStyles = [
      styles.background,
      {
        top: this.props.hideStatusBar ? 0 : STATUSBAR_HEIGHT,
        height: this.props.hideStatusBar ? VIEWPORT_HEIGHT : VIEWPORT_HEIGHT - STATUSBAR_HEIGHT
      },
      { backgroundColor: this.props.backgroundColor },
      additionalStyles
    ];

    return (
      <Animated.View style = {backgroundStyles}></Animated.View>
    )
  }

  getHeaderView(additionalStyles) {
    let headerStyles = [
          styles.header,
          { top: this.props.hideStatusBar ? 0 : STATUSBAR_HEIGHT },
          additionalStyles
        ]

    return (
      <Animated.View style = {headerStyles}>

        {this.props.getCustomHeader ? this.props.getCustomHeader(this.closeModal) :
          <TouchableOpacity onPress = {this.closeModal}>
            <Text style = {styles.closeButton}>x</Text>
          </TouchableOpacity>
        }

      </Animated.View>
    )
  }

  getContentView(additionalStyles, dragHandlers) {
    return (
      <Animated.View style = {[additionalStyles]} {...dragHandlers}>
        {this.props.content}
      </Animated.View>
    );
  }

  render() {
    let {
      isOpen,
      origin,
      backgroundOpacity,
      swipeToClose
    } = this.props,

    {
      target,
      isAnimating,
      isPanning,
      openVal
    } = this.state,

    dragHandlers = swipeToClose ? this._panResponder.panHandlers : null,

    backgroundAnimation = {
      opacity: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, backgroundOpacity]
      })
    },

    headerAnimation = {
      opacity: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, target.opacity]
      })
    },

    openingOpacity = this.props.customContent ? headerAnimation : {},

    openingAnimation = [
      styles.open,
      {
        left: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.posX, target.posX]
        }),

        top: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.posY, target.posY]
        }),

        width: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.width, VIEWPORT_WIDTH]
        }),

        height: openVal.interpolate({
          inputRange: [0, 1],
          outputRange: [origin.height, VIEWPORT_HEIGHT]
        })
      },
      openingOpacity
    ],

    dragAnimation,
    backgroundView,
    headerView,
    contentView;

    if (isPanning) {
      dragAnimation = this.state.pan.getLayout();

      backgroundAnimation.opacity =  this.state.pan.x.interpolate({
        inputRange: [-VIEWPORT_HEIGHT, 0, VIEWPORT_HEIGHT],
        outputRange: [0, backgroundOpacity, 0]
      });

      headerAnimation.opacity = this.state.pan.x.interpolate({
        inputRange: [-VIEWPORT_HEIGHT, 0, VIEWPORT_HEIGHT],
        outputRange: [0, 1, 0]
      });
    }

    backgroundView = this.getBackgroundView(backgroundAnimation);
    headerView = this.getHeaderView(headerAnimation);
    contentView = this.getContentView([openingAnimation, dragAnimation], dragHandlers);

    return (
      <Modal
        visible = {isOpen}
        transparent = {true}
        onRequestClose = {() => null} >
          {backgroundView}
          {contentView}
          {headerView}
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    width: VIEWPORT_WIDTH
  },

  open: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  header: {
    position: 'absolute',
    left: 0,
    width: VIEWPORT_WIDTH,
    backgroundColor: 'transparent',
  },

  closeButton: {
    fontSize: 35,
    color: '#fff',
    lineHeight: 40,
    textAlign: 'center',
    width: 40,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.8
  }
});

export default Overlay;
