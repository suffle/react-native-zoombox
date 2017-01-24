# react-native-zoombox
A zoomable Box for React Native

## Installation
```
npm install --save react-native-zoombox
```

## Usage
```javascript
import ZoomBox from 'react-native-zoombox';

class ZoomBoxExample extends React.Component {
  render() {
    return (
      <ZoomBox>
        <Image
          style = {{ flex: 1 }}
          source = {{ uri: 'http://www.placehold.it/800x600' }} />
      </ZoomBox>
    );
  }
}
```

## Properties
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `backgroundColor` | string | #000 | Background color of  modal|
| `backgroundOpacity` | float | 1 | Opacity of  modal background|
| `underlayColor` | string | #fff | Underlay color of touchable |
| `hideStatusBar` | boolean | true | Fullscreen modal with hidden status bar (There is a Bug on Android with Modals, where a hidden StatusBar is not working correctly, see: [RN Issue #7474](https://github.com/facebook/react-native/issues/7474))|
| `swipeToClose` | boolean | false | Close modal on vertical or horizontal swipe (WIP works, but opacity does not change in both dimension) |
| `customHeader` | function(closeAction) | NULL | Function, that returns markup for a custom header with invokes the closeAction |
| `customContent` | function | children | Use different content in modal |
| `customAnimation` | function(startValue, endValue) | NULL | Function, that returns custom animation for opening/closing the modal. Default: `Animated.spring(startValue, {toValue: endValue, tension: 30, friction: 7})` |
| `inModalProps` | object | null | Set different properties to content when in modal |

## Example
For more examples check the demo folder
### Custom header function
This is an example for a custom header:
```javascript
_customHeader(closeModal) {
  return (
      <TouchableHighlight onPress = {closeModal}>
        <Text style = {styles.closeButton}>Close</Text>
      </TouchableHighlight>
  )
}
```
### Custom animation function
This is an example for a custom animation:
```javascript
_customAnimation(startValue, endValue) {
  return (
    Animated.timing(
      startValue,
      {toValue: endValue, duration: 1000}
    )
  )
}
```
