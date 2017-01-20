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
