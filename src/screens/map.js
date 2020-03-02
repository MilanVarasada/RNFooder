import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Dimensions, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions'
import MapView, { Marker, Polyline,PROVIDER_GOOGLE } from 'react-native-maps'

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class Map extends Component {

    constructor(props) {
        super(props)
        Permissions.askAsync(Permissions.LOCATION)
        navigator.geolocation.watchPosition(this.onSuccess, this.onError)
        this.state= {
            coords: null,
        }
    }

    onSuccess = (position) => {
        console.log(position);
    }

    onError = (error) => {
        console.log(error.description);
        
    }

    componentDidMount(){
        this._watchLocation();
    }
    _watchLocation = async () => {
        await navigator.geolocation.watchPosition(position => {
          this.setState({ coords: position.coords });
        });
      };

      _getLocation = async () => {
        await navigator.geolocation.getCurrentPosition(position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta:  0.005,
            longitudeDelta:  0.005
          };
        });
      };

      render() {
        return (
          <View style={styles.topHeader}>
            <SafeAreaView>
              <View style={{ flex: 1 }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  showsMyLocationButton={true}
                  showsPointsOfInterest={true}
                  showsCompass={true}
                  initialRegion={{
                    latitude: 23.029213,
                    longitude: 72.570387,
                    latitudeDelta: 0.0, // 0.0922
                    longitudeDelta: 0.2 //0.0421
                  }}
                >
                  <Marker
            
                    coordinate={{  latitude: 23.025734,
                      longitude: 72.503349 }}
                    title="Solution Analysts Pvt Ltd"
                    description="Solution Analysts Pvt Ltd, 101, Sankalp Iconic, Opp. Vikram Nagar, Ambli - Bopal Road, Iskcon Cross Road, Ahmedabad, Gujarat" 
                    onPress={() => {
                      // Alert.alert("Ahmedabad", "Solution Analysts Pvt Ltd");
                      this._getLocation()
                    }}
                  />  
    
                  <Polyline
                    coordinates={[

                      {
                        latitude: 23.025734,
                        longitude: 72.503349
                    },
                    {
                        latitude: 23.025530,
                        longitude: 72.505603
                    },
                    {
                        latitude: 23.024113,
                        longitude: 72.505498
                    },
                    {
                        latitude: 23.023941,
                        longitude: 72.506493
                    },
                    {
                        latitude: 22.987242,
                        longitude: 72.494659
                    },
                    {
                        latitude: 22.987154, //6 
                        longitude: 72.502040
                    },
                    {
                        latitude: 22.987628,
                        longitude: 72.503231
                    },
                    {
                        latitude: 22.988289,
                        longitude: 72.508788
                    },
                    {
                        latitude: 22.989287,
                        longitude: 72.513348
                    },
                    {
                        latitude: 22.989731, //10 
                        longitude: 72.514711
                    },
                    {
                        latitude: 22.992625,
                        longitude: 72.521921
                    },
                    {
                        latitude: 22.993500,
                        longitude: 72.525227
                    },
                    {
                        latitude: 22.991233,
                        longitude: 72.525443
                    },
                    {
                        latitude: 22.990132,
                        longitude: 72.525640
                    },
                    {
                        latitude: 22.990130,
                        longitude: 72.525181
                    },
                        
                    ]}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={[
                      "#7F0000",
                      "#B24112", // no color, creates a "long" gradient between the previous and next coordinate
                      "#E5845C",
                      "#70b3ae",
                      "#418fbc", // no color, creates a "long" gradient between the previous and next coordinate
                      "#989377",
                      "#7F0000",
                      "#B24112", // no color, creates a "long" gradient between the previous and next coordinate
                      "#E5845C",
                      "#7F0000",
                      "#B24112", // no color, creates a "long" gradient between the previous and next coordinate
                      "#E5845C",
                      "#7F0000",
                      "#B24112", // no color, creates a "long" gradient between the previous and next coordinate
                    ]}
                    strokeWidth={5}
                  />
                </MapView>
              </View>
            </SafeAreaView>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      map: {
        height: screenHeight,
        width: screenWidth
      },
      topHeader: {
        ...Platform.select({
          ios: {},
        })
      }
    });