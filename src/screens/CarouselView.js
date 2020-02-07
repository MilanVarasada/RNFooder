import * as React from 'react';
import {StyleSheet,View,ScrollView,Dimensions,Image} from 'react-native';

const DEVICE_WIDTH = Dimensions.get("window").width;

class CarouselView extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex:0
        };
    }

    componentDidMount = () => {
        setInterval(() => {
        this.setState(prev => ({selectedIndex:prev.selectedIndex === this.props.images.length - 1 ? 0 : prev.selectedIndex + 1}),
        () => {
            this.scrollRef.current.scrollTo({
                animated:true,
                y:0,
                x: DEVICE_WIDTH * this.state.selectedIndex
            })
        })
        }, 2000)
    }

    setSelectedIndex = event => {
        //use for find width of current event
        const viewsize = event.nativeEvent.layoutMeasurement.width;
        const positionOfScrollview = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.floor(positionOfScrollview / viewsize)
        this.setState({selectedIndex});

    }

    render() {
        const {images} = this.props
        const {selectedIndex} = this.state

        return (
            <View style={{height:"100%",width:"100%"}}>
            <ScrollView
             horizontal 
             pagingEnabled 
             onMomentumScrollEnd={this.setSelectedIndex}
             ref = {this.scrollRef}
             >
                {images.map(image => (
                    <Image 
                        key={image}
                        source={{uri: image}}
                        style={styles.carouselImage}
                    />
                ))}
            </ScrollView>
            <View style={[styles.pageControlDiv]}>
                    {images.map(( image, i ) => (
                    <View key={image} style={[styles.pageControl , 
                        { opacity: i === selectedIndex ? 0.5 :1}
                    ]} />
                    ))}
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        carouselImage : {
            height: "100%",
            width:DEVICE_WIDTH,
            resizeMode:'cover'
        },
        pageControl : {
            width:10,
            height: 10,
            borderRadius: 5,
            margin: 7,
            backgroundColor:'white'
        },
        pageControlDiv : {
            position:'absolute',
            top:'60%',
            height:10,
            width:'100%',
            display:"flex",
            flexDirection:"row",
            justifyContent:'center',
            alignItems:'center'
        },
    }
);

export { CarouselView };