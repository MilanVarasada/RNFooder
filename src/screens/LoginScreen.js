import React,{Component} from 'react';
import {Dimensions} from 'react-native'
import {TouchableOpacity,StyleSheet,View,Text,Image,TextInput,Alert,Platform} from 'react-native';
import {CarouselView} from'./CarouselView'
import SafeAreaView from 'react-native-safe-area-view';

const images = [
    "https://previews.123rf.com/images/pb_mail2000/pb_mail20000903/pb_mail2000090300002/4484783-high-resolution-for-food-beverage-photo.jpg",
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ];

//   var images=[{image:require('../../assets/slide1.jpg')},{image:require('../../assets/slide2.jpg')},{image:require('../../assets/slide3.jpg')}];

export default class LoginScreen extends Component {
    constructor() {
        super()
        this.state = { email: 'jm1@example.com', password: 'jay@123',isLoading : false }
        
    }
    
    render() {
        return <View style = {styles.mainView}>
        <View style = {styles.topVIew}>
            <CarouselView images={images} />
        </View>
        <View style = {styles.bottomView}>
        
        <Text style = {[styles.welcomeback]}>Welcome back</Text>
        <Text style = {[styles.loginToYourAccount]}>Login to your Account</Text>
        <TextInput
        style = {[styles.commanTextInput,styles.emailInput]}
        placeholder = "Email" 
        keyboardType = 'email-address'
        value={this.state.email}
        onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
        style = {[styles.commanTextInput,styles.passwordInput]}
        placeholder = "Password" 
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        secureTextEntry = {true}
        />
        <TouchableOpacity
        style={styles.loginButtonStyle}
        onPress={this.onLoginPress}
        >
        <Text style = {[styles.logInButtonTitle]}> Login </Text>
        </TouchableOpacity>
        <View style = {{top:'25%'}}> 
        <TouchableOpacity>
        <Text style = {[styles.forgotButton]}> Forgot Your Password? </Text>
        </TouchableOpacity>
        </View>
        <View style = {{bottom:10,position:'absolute',flexDirection:'row'}}> 
        <Text style = {[styles.signUpText]}>Don't have an account?</Text>
        <TouchableOpacity
        style={{height:30,width:100}}
        >
        <Text style = {[styles.signUpButton]}> Sign Up</Text>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        
    }
    
    onLoginPress = () => {
        this.setState({ isLoading: true });
        fetch('http://35.160.197.175:3006/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': this.state.email,
                    'password': this.state.password
                })
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    this.setState({ isLoading: false });
                }
            }).then((responseJSON) => {
                this.setState({ isLoading: false });
                Alert.alert('Success', 'Welcome! ' + responseJSON.firstName + ' ' + responseJSON.lastName, [
                    {
                        text: 'Okay',
                        style: 'cancel',
                        onPress: () => {
                            this.props.navigation.navigate('List',{token:responseJSON.token});
                        }
                    },
                    {
                        text: 'Cancel',
                        style: 'destructive'
                    },
                ])
            })
    }
    
    static navigationOptions = {
        //To hide the ActionBar/NavigationBar
        headerShown : false
    };
}

const styles = StyleSheet.create ({
    mainView : {
        flex : 1,
        // justifyContent:'flex-end'
    },
    
    topVIew : {
        height:Dimensions.get('window').height * 0.6,
        alignSelf:'flex-start',
    },

    welcomeback : {
        fontSize:35,
        top:'5%',
        fontWeight:'400'
    },

    loginToYourAccount : {
        fontSize:15,
        top:'7%',
        fontWeight:'300'
    },

    commanTextInput : {
        height:45,
        fontSize:18,
        padding:10,
        color:'rgba(97,97,97,1)',
        fontWeight:'400',
        top:'15%',
        width:'85%',
        backgroundColor:'rgba(236,239,241,1)',
        borderWidth:0.3,
        borderColor:'gray',
        borderRadius:20
    },
    
    bottomView : {
        height:Dimensions.get('window').height * 0.6,
        width:'100%',
        position:'absolute',
        bottom:0,
        backgroundColor:'rgba(255, 255, 255,1)',
        borderTopRightRadius:15,
        borderTopLeftRadius:15,
        alignItems:'center'
    },
    
    passwordInput: {
        top:'17%'
    },
    
    loginButtonStyle : {
        top: '22%',
        backgroundColor: 'rgba(249, 57, 99, 1.0)',   
        height: 45,
        justifyContent: 'center',
        borderRadius: 20,
        width:'85%',
        alignItems:'center'
    },
    
    logInButtonTitle : {
        color:'white',
        fontSize:18,
        fontWeight:'300'
    },

    signUpButton: {
        fontSize:18,
        color:'rgba(249, 57, 99, 1.0)',
        fontWeight:'300',
        bottom:3
    },

    
    forgotButton : {
        color:'rgba(38, 49, 95, 1.0)',
        fontSize:18,
        fontWeight:'300',
        top:'50%'
    },

    signUpText : {
        color:'rgba(38, 49, 95, 1.0)',
        fontSize:18,
        fontWeight:'300',
    },



    
    backButton:{
        top:10,
    },
    
    createNewAccountButtonTitle :{
        color:'rgba(33, 118, 234, 1.0)',
        fontSize:15,
        fontWeight:'400',
    },
    
    createNewAccountButton : {
        backgroundColor: 'rgba(229, 243, 255, 1.0)',  
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
        width:'92%',
        alignItems:'center'
    },
})