import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="AIzaSyAah4P19w1FbvcLu40p4xbgkgUKht-lw9U"
        strokeWidth={3}
        strokeColor="#222"
    />
);

export default Directions;
