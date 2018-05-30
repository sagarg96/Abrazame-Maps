import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Callout } from 'react-native-maps';
import * as myConstants from './myConstantsClass';


const myStory = "Open Story";

const usersMap = props => {

    let userLocationMarker = null;
    if( props.userLocation){
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}> 
            <MapView.Callout>
                 <View>
                    <Text> {myStory} </Text>
                </View>
            </MapView.Callout>
        </MapView.Marker>
    }

const usersMarkers = props.usersPlaces.map(userPlace => <MapView.Marker coordinate= {userPlace} key={userPlace.id} />);
const userResources = props.userResources.map(userResource => <MapView.Marker coordinate= {userResource} key={userResource.id} pinColor={'#000FFF'} />);
const markerAlert = function(){
    Alert.alert(
        'Story from Paolo Alto',
        myConstants.testStory,
        [
          //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          //{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Close', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
}

    return(
        <View style={styles.mapContainer}> 
            <MapView
                initialRegion={{
                    latitude: 37.4220,
                    longitude: -122.0840,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                region={props.userLocation}
                style={styles.map}
                //customMapStyle = {myConstants.nightMapStyle} 
                //zoomEnabled = {false}
                mapType = {"standard"}
                maxZoomLevel = {10}
                showsPointsOfInterest = {true}
                onCalloutPress = { markerAlert }
                >
                
                { userLocationMarker }
                { usersMarkers }
                { userResources }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        
        top: 60,
        left: 20,
      
    },
    map: {
        width: '100%',
        height: '100%'
    }
});


export default usersMap;
