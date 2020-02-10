import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native';

export default class fbLoginComponent extends Component {
    componentDidMount(){
        console.log(this.props)
    }

    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        headerShown : false
    };

    getImageUrl(url) {
        console.log(url)

        if (url == null) {
            return require('../../assets/slide1.jpg')
        } else {
            return { uri: url }
        }
    }


    render() {
        var data = this.props.navigation.state['params']
        return <View style={styles.container}>
        <View style={styles.topView}>
        <Text style={styles.recipeNameStyle}>{data.name}</Text>
        </View>
        <View style={styles.recipeView}>
            <View style={styles.recipeContent}>
            <Image source={this.getImageUrl(data.photo)} 
            style = {styles.imageStyle}
            />
            <View style={{backgroundColor:'',height:150,top:175,flexDirection:'row',paddingHorizontal:10}}>
            <View style={{flex:1,backgroundColor:'',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Complexity</Text>
            <Text style={{color:'rgba(255,255,255,0.7)',fontSize:30,fontWeight:'bold'}}>Easy</Text>
            </View>
            <View style={{flex:1,backgroundColor:'',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Serves</Text>
            <Text style={{color:'rgba(255,255,255,0.7)',fontSize:30,fontWeight:'bold'}}>5</Text>
            </View>
            <View style={{flex:1,backgroundColor:'',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Time</Text>
            <Text style={{color:'rgba(255,255,255,0.7)',fontSize:30,fontWeight:'bold'}}>3 Hour</Text>
            </View>
            </View>
            </View>
            <View >
            <TouchableOpacity 
            style={styles.buttonStyle}
            >
            <Text style={styles.textStyle}>VIEW RECIPE</Text>
            </TouchableOpacity> 
            </View>
        </View>
        </View>
    }
    
}

const styles = StyleSheet.create(
    {
        container : {
            flex:1,
            backgroundColor:'rgba(245,245,245,1)'
        },

        recipeNameStyle: {
            fontSize:50,
            color:'white',
            top:20,
            alignSelf:'center',
            fontFamily:'Cochin',
        },

        topView:{
            flex:0.2,
            flexDirection:'column-reverse',
            backgroundColor:'rgba(255,0,80,1)'
        },

        recipeView : {
            flex:1,
            backgroundColor:'white',
            justifyContent:'center'
        },

        recipeContent:{
            flex:0.7,
            backgroundColor:'rgba(255,0,80,1)',
            marginLeft:40,
            marginRight:40,
            borderRadius:15,
            shadowOffset: { height: 0, width: 0 },
            elevation: 3,
            shadowRadius: 30,
            shadowOpacity: 0.7
        },

        buttonStyle : {
            top:-30,
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            borderWidth : 0,
            borderRadius:30,
            borderColor:'black',
            width:'70%',
            backgroundColor:'rgba(255,255,255,1)',
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
        },

        textStyle : {
            
            paddingHorizontal:40,
            paddingVertical:15,
            
            color:'rgba(255,0,80,1)',
            fontFamily:'Cochin-Bold',
            fontSize:22,
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
        },

        imageStyle : {
            height:250,
            width:250,
            alignSelf:'center',
            top:-100,borderRadius:125, 
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5,
            position:'absolute'
        },
            

    })