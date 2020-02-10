import React,{Component} from 'react';
import {Text,View,StyleSheet,FlatList,RefreshControl,ActivityIndicator,TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import RecipeCell from '../Components/RecipeCell';
import LoadingComponent from '../Components/LoadingComponent';

export default class fbLoginComponent extends Component {
    static navigationOptions = {
        title: 'Recipe',
        headerShown : false
    }

    constructor() {
      super()
      this.state = {
          isLoading: false,
          recipeInfoList: [],
          isFetching: false,
      }
  }

  componentDidMount() {
      return this.getRecepeList()
  }

  goToRecepieDetail(item) {
    // console.log('Selected Item :',item);
    this.props.navigation.navigate('RecipeDetails',item)
}
  
  onRefresh() {
    this.setState({ isFetching: false })
    this.getRecepeList()
    }

getRecepeList = () => {
  this.setState({ isLoading: true })
  const { navigate } = this.props.navigation;
  fetch('http://35.160.197.175:3006/api/v1/recipe/feeds',
      {
          method: 'GET',
          headers: {
              'Authorization': 'Bearer ' + this.props.navigation.state['params']['token'] 
          }
      }).then((response) => { return response.json() })
      .then((responseJson) => {
          this.setState({ isLoading: false })
          if (responseJson.error != null) {
              Alert.error('ERROR', responseJson.error)
          }
          else {
              // console.log(responseJson);
              this.setState({ recipeInfoList: responseJson, isFetching: false })
          }
      }).catch((error) => {
          this.setState({ isLoading: false })
          Alert.alert('ERROR', error)
      })
}


    render() {
        var token = this.props.navigation.state['params']['token']
        return <View style = {styles.container}>
        <TouchableOpacity
        style = {{position:'absolute',height:30,width:130,right:20,top:50,backgroundColor:'rgba(255,0,80,1)',
        shadowOffset: { height: 10, width: 10 },
        elevation: 3,
        shadowRadius: 10,
        shadowOpacity: 0.5,alignItems:'center',justifyContent:'center',borderRadius:15}}
        onPress = {() => {
            this.props.navigation.navigate('Add',{token})
        }}
        >
        <Text style={{fontWeight:'bold',fontSize:25,fontFamily:'Cochin',color:'white'}}>Add Item</Text>
        
        </TouchableOpacity>
        <View style = {styles.redContainer}>
        </View>
        <View style = {{position:'absolute',top:50}}>
          <Text style = {styles.topTitle}>Top Items</Text>
          <Text style = {styles.topTitle}>BY JM:-</Text>
        </View>
        <FlatList 
        
        style = {styles.recipeList}
        data={this.state.recipeInfoList}
        renderItem = {({item,index}) => 
            <RecipeCell item={item} onPress={() => {
                this.goToRecepieDetail(item)
            }}/>
          
        
   }
        keyExtractor={item => item.id}
        refreshControl={
            <RefreshControl
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            />
          }

      />
      <LoadingComponent isLoading={this.state.isLoading} />
        </View>
    }
}

const styles = StyleSheet.create(
    {
        container : {
            flex:1,
            flexDirection:'row',
            backgroundColor:'rgba(245,245,245,1)'
        },

        redContainer : {
            flex:0.6,
            backgroundColor:'rgba(255,0,80,1)'
        },

        recipeList : {
            height:'100%',
            width:'100%',
            position:'absolute',
            top:'20%'
        },

        topTitle:{
            fontSize:45,fontWeight:'bold',color:'white',fontFamily:'GillSans-BoldItalic',left:15
        }
    }
)
