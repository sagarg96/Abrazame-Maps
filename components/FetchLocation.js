import React from 'react';
import { Button } from 'react-native';


const fetchLocation = props => {
    return( <Button title = "Asignar Ubicación" /*"Set location"*/ onPress={props.onGetLocation}/>
);
};


export default fetchLocation;