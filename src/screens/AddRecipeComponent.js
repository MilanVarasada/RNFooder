import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, PermissionStatus, Permission, Alert,ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import LoadingComponent from '../Components/LoadingComponent'
// import LoadingComponent from './LoadingComponent';

export default class AddRecipeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedComplexity: 'Easy',
            recipeName: '',
            preparationTime: '',
            serves: '',
            hasCameraPermission: null,
            image: null,
            isLoading:false
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        } else {
            Alert.alert('Image picker Cancelled')
        }
    }

    render() {
        return  (
        <ImageBackground    
        source={require('../../assets/background.jpg')}
        style={{ width: "100%", height: "100%", resizeMode: "resize" }}
      >
        <View style={{ flex: 1}}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this._pickImage()
                }} style={{ backgroundColor: 'white', height: 100, width: 100, margin: 20 }}>
                    {this.state.image ?
                        <Image source={{ uri: this.state.image }} style={{ flex: 1 }} />
                        :
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'rgba(255,0,80,1)'}}><Text style={{color:'rgba(255,0,80,1)'}}>Pick Image</Text></View>
                    }
                </TouchableOpacity>
                <View style={{
                    height: 50,
                    width: '80%',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={{
                        aspectRatio: 1,
                        height: 30,
                        width: 30,
                        tintColor: 'rgba(255,0,80,1)'
                    }} source={require('../../assets/right.png')} ></Image>
                    <TextInput
                        placeholder="Add Your Recipe Name"
                        style={{
                            flex: 1,
                            width: '100%',
                            paddingLeft: 20,
                            fontSize: 20
                        }}
                        value={this.state.recipeName}
                        onChangeText={(recipeName) => this.setState({ recipeName })}>
                    </TextInput>
                </View>
                <View style={{
                    height: 50,
                    width: '80%',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <Image style={{
                        aspectRatio: 1,
                        height: 30,
                        width: 30,
                        tintColor: 'rgba(255,0,80,1)'
                    }} source={require('../../assets/right.png')} ></Image>
                    <TextInput
                        placeholder="Add Your preparation time"
                        style={{
                            flex: 1,
                            width: '100%',
                            paddingLeft: 20,
                            fontSize: 20
                        }}
                        value={this.state.preparationTime}
                        onChangeText={(preparationTime) => this.setState({ preparationTime })}>
                    </TextInput>
                </View>
                <View style={{
                    height: 50,
                    width: '80%',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <Image style={{
                        aspectRatio: 1,
                        height: 30,
                        width: 30,
                        tintColor: 'rgba(255,0,80,1)'
                    }} source={require('../../assets/right.png')} ></Image>
                    <TextInput
                        returnKeyType={'done'}
                        keyboardType='numeric'
                        placeholder="Number of Serves?"
                        style={{
                            flex: 1,
                            width: '100%',
                            paddingLeft: 20,
                            fontSize: 20
                        }}
                        value={this.state.serves}
                        onChangeText={(serves) => this.setState({ serves: serves })}>
                    </TextInput>
                </View>
                <Text style={{ marginTop: 20, fontSize: 20 , color:'rgba(255,0,80,1)' }}>Select Your Complexity Level</Text>
                <View style={{ height: 100, width: '80%', marginVertical: 20, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{ height:20,flex: 1, backgroundColor: this.state.selectedComplexity == 'Easy' ? 'rgba(255,0,80,1)' : 'rgba(0,0,0,0.5)', justifyContent: 'center', borderRadius: 10, marginHorizontal: 10 }} onPress={() => {
                        this.setState({ selectedComplexity: 'Easy' })
                    }}><Text style={{ height:20,textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Easy</Text></TouchableOpacity>
                    <TouchableOpacity style={{ top:30,flex: 1, backgroundColor: this.state.selectedComplexity == 'Medium' ? 'rgba(255,0,80,1)' : 'rgba(0,0,0,0.5)', justifyContent: 'center', borderRadius: 10, marginHorizontal: 10 }} onPress={() => {
                        this.setState({ selectedComplexity: 'Medium' })
                    }}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Medium</Text></TouchableOpacity>
                    <TouchableOpacity style={{top:60,height:20, flex: 1, backgroundColor: this.state.selectedComplexity == 'Complex' ? 'rgba(255,0,80,1)' : 'rgba(0,0,0,0.5)', justifyContent: 'center', borderRadius: 10, marginHorizontal: 10 }} onPress={() => {
                        this.setState({ selectedComplexity: 'Complex' })
                    }}><Text style={{height:20, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Complex</Text></TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {
                    console.log(this.state)
                    console.log(this.props)
                    this.addRecipe()
                }} style={{ height: 50, width: '60%', backgroundColor: 'rgba(255,0,80,1)', bottom: 100, position: 'absolute', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}><Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Add</Text></TouchableOpacity>
            </View>
            <LoadingComponent isLoading={this.state.isLoading}></LoadingComponent>
        </View>
        </ImageBackground>
        )
    }


    addRecipe() {
        console.log(this.props.navigation.state['params']['token']);
        this.setState({isLoading:true})
        fetch('http://35.160.197.175:3006/api/v1/recipe/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.navigation.state['params']['token']
            },
            body: JSON.stringify({
                name: this.state.recipeName,
                preparationTime: this.state.preparationTime,
                serves: Number(this.state.serves),
                complexity: this.state.selectedComplexity
            })
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                console.log('Error')
            }
        }).then((responseJSON) => {
            console.log(responseJSON)
            this.uploadImage(responseJSON.id)
        })
    }


    uploadImage(id) {
        var photo = {
            uri: this.state.image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        var formData = new FormData();
        formData.append('photo', photo);
        formData.append('recipeId',id)

        fetch('http://35.160.197.175:3006/api/v1/recipe/add-update-recipe-photo', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.navigation.state['params']['token']
            },
            body: formData
        }).then((responseJson) => {
            this.setState({isLoading:false})
            Alert.alert('Success','Recipe added')
          }).catch((error) => {
            this.setState({isLoading:false})
            Alert.alert('Fail','Failed to add recipe')
          });
    }
}