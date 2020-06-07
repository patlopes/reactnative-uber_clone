import React, { useEffect, useState, Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getPixelSize } from '../../utils';
import Geocoder from 'react-native-geocoding';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import markerImage from '../../assets/car.jpg';
import backImage from '../../assets/back.png';

import {
    Back,
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall,
} from './styles';

const Map = () => {
    const [region, setRegion] = useState(null);
    const [destination, setDestination] = useState(null);
    const [duration, setDuration] = useState(0);
    const [location, setLocation] = useState('');

    Geocoder.init('AIzaSyAah4P19w1FbvcLu40p4xbgkgUKht-lw9U', { language: 'pt' });

    const locationSelectedHandler = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
        });
    };
        
    const backHandler = () => {
        setDestination(null);
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const newLocation = address.substring(0, address.indexOf(','));

                setLocation(newLocation);
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                });
            }, //sucesso
            () => { },
            {
                timeout: 3000,
                enableHighAccuracy: true,
                maximumAge: 5000,
            }
        );
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={el => (this.mapView = el)}
            >
                {destination && (
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => {
                                setDuration(Math.floor(result.duration));

                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(350),
                                    },
                                });
                            }}
                        />
                        <Marker
                            coordinate={destination}
                            anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker
                            coordinate={region}
                            anchor={{ x: 0, y: 0 }}
                        >
                            <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>{duration}</LocationTimeText>
                                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>{location}</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
            </MapView>

            {destination ? (
                <Fragment>
                    <Back onPress={()=>{
                        let lat = destination.latitude;
                        let lon = destination.longitude;
                        lat += 0.001;
                        lon += 0.001;
                        setDestination({...destination, latitude:lat, longitude:lon});
                    }}>
                        <Image source={backImage} />
                    </Back>
                    <Details />
                </Fragment>
            ) : (
                    <Search onLocationSelected={locationSelectedHandler} />
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default Map;
