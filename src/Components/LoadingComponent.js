import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default function LoadingComponent(props) {
    if (props.isLoading) {
        return <View style={{ position: 'absolute', width: '100%', height: '110%', zIndex: 1 ,backgroundColor:'rgba(0,0,0,0.5)'}}>
            <ActivityIndicator size='large' color='red' style={{ flex: 1 }}></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}
