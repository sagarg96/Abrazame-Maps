import React from 'react';
import { StyleSheet, Text, View, Button, Alert, PermissionsAndroid } from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';


export default class App extends React.Component {

  
//   async requestLocationPermission() {
//     const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//     if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
//         alert("You're consenting to share your location on the heatmap. Please note your identity will not be revealed and only your approximate location will be displayed");
//     } else {
//         try {
//             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     'title': 'Required Location permission',
//                     'message': 'We required Location permission in order to get device location '
//                 }
//             )
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//               Alert.alert(
//                 'Alert Title',
//                 'My Alert Msg',
//                 [
//                   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
//                   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//                   {text: 'OK', onPress: () => }
//                 ],
//                 { cancelable: false }
//               )} else {
//                 alert("You don't have access for the location");
//             }
//         } catch (err) {
//             alert(err)
//         }
//     }
// };

  state = {
    userLocation: null,
    usersPlaces: [],
    userResources: []
  }

  getUserLocationHandler = () => {
    
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });


      /*** Firebase Code to store current location in DataBase. Uncomment to use*/
      
      // fetch('https://abrazame-f97f8.firebaseio.com/places.json', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude,
      //   })
      // })
      // .then( res => console.log(res))
      // .catch( err => console.log(err));
      
      /**************** */
      //console.log(position)
      
    }, err => console.log(err));
  }

  getUserPlacesHandler = () => {

    fetch('https://abrazame-f97f8.firebaseio.com/places.json') 
      .then( res => res.json())
      .then(parsedRes => {
        const placesArray = [];  

        for( const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });

        this.setState({
          usersPlaces: placesArray
        });

        }
      })
      .catch( err => console.log(err));

  };

  getUserResourcesHandler = () => {

    fetch('https://abrazame-f97f8.firebaseio.com/resources.json') 
      .then( res => res.json())
      .then(parsedRes => {
        const resourcesArray = [];  

        for( const key in parsedRes){
          resourcesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });

        this.setState({
          userResources: resourcesArray
        });

        }
      })
      .catch( err => console.log(err));

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={ {marginBottom: 20, marginEnd: 10}} >
          <Button title= "Obtener Mapa de Calor" /*"Get Heatmap"*/ onPress=
          { this.getUserPlacesHandler} />
        </View>

        <View style={ {marginBottom: 20, marginEnd: 10 }} >
          <Button title= "Obtener Recursos"/* "Get Resources" */ onPress=
          { this.getUserResourcesHandler} />
        </View>
        {/* <Text>It works so far</Text> */}
        
        <FetchLocation onGetLocation={this.getUserLocationHandler} /> 
        <UsersMap     //details to render on the map component
        userLocation = {this.state.userLocation} 
        usersPlaces = {this.state.usersPlaces}
        userResources = {this.state.userResources}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',//'center',
   // alignContent: 'center',
   // justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
  },
});
