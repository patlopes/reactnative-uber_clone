import React from 'react';
import Geolocation from '@react-native-community/geolocation';
//import {StyleSheet, View} from 'react-native';

import Map from './components/Map';

const App = () => {
  Geolocation.setRNConfiguration({skipPermissionRequests: false, authorizationLevel: 'always'});
  return (
    <Map />
  );
};

export default App;
