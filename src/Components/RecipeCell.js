import React,{Component} from 'react';
import {View,Image,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import {ListRecipe} from '../screens/ListRecipe'

export default class RecipeCell extends Component {
    getImageUrl(url) {
      
        if (url == null) {
            return require('../../assets/slide1.jpg')
        } else {
            return { uri: this.props.item.photo }
        }
      }

      

    render() {
  return <View style = {[styles.mainView]}>
    <View style = {styles.recipeContent}>
    <View style = {styles.imageView}>
        <Image 
        source={this.getImageUrl(this.props.item.photo)}
        style={styles.imageStyle}
        />
    </View>
        <View style = {{backgroundColor:'white',left:-30,width:'50%',alignSelf:'flex-start',top:10}}>
            <Text style = {styles.recipeName}>{this.props.item.name}</Text>
            <Image 
            source={require('../../assets/5star.png')}
            style={{top:10,resizeMode:'cover',height:25,width:100}}
            />
        <View style={{top:20,width:'100%'}}>
        <Text style = {{fontWeight:'600',fontSize:20}}>👨🏻‍🍳 {this.props.item.firstName + ' ' + this.props.item.lastName}</Text>
        </View>
        </View>
        
        <TouchableOpacity 
        style={styles.buttonStyle}
        onPress = {() => this.props.onPress()}
        >
        <Image source={require('../../assets/right.png')} style = {{height:20,width:20,tintColor:'rgba(255,0,80,1)'}} />
        </TouchableOpacity>
</View>
  </View>
}
}
const styles = StyleSheet.create(
    {
        mainView : {
            // backgroundColor:'black',
            height:130,
            width:'100%',
            alignSelf:'center',
            marginVertical:20,
        },

        recipeContent : {
            backgroundColor:'white',
            width:'70%',
            height:'100%',
            alignSelf:'center',
            borderRadius:15,
            justifyContent:'space-between',
            flexDirection:'row',
            alignItems:'center',
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
            // alignContent:'space-between'
        },

        imageView : {
            shadowOffset: { height: 10, width: 10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5
        },

        imageStyle : {
            height:85,
            width:85,
            left:-48,
            borderRadius:20,
            
            // position:'absolute'

        },

        buttonStyle : {
            right:-20,
            height:40,
            width:40,
            borderRadius:20,
            shadowOffset: { height: 10, width: -10 },
            elevation: 3,
            shadowRadius: 10,
            shadowOpacity: 0.5,
            backgroundColor: 'white',
            alignItems:'center',
            justifyContent:'center'
        },

        recipeName : {
            fontSize:20,
            fontWeight:"bold"
        }
    }
)