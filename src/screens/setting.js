import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'

class SettingComponent extends Component {

  componentDidMount(){
    console.log("Setting" , this.props.token);
    
  }
    render() {
  
        return (
          <View style={styles.container}>
              <Text> Setting</Text>
            </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
    }
});

const mapStateToProps = (state) => {
  return { token: state.token}
}
export default connect(mapStateToProps)(SettingComponent)