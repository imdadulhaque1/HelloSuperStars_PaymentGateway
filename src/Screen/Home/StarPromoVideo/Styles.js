import {
    Dimensions,
    StyleSheet,
} from 'react-native';
const { width } = Dimensions.get('window');

const promoWidth=(width/3.4).toFixed(0);
let widthPromo=parseInt(promoWidth)
const styles = StyleSheet.create({


backgroundVideo:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
},
    
    container: {
        // backgroundColor: 'pink',
        backgroundColor: '#343434',
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 0,
        marginBottom: 9,

        // borderColor: '#2c2c2cb6',
        // borderWidth: 3
    },
    containerWidthScreen: {
        // backgroundColor: 'pink',
        backgroundColor: '#343434',
        paddingVertical: 10,
        borderRadius: 10,
        // borderColor: '#2c2c2cb6',
        // borderWidth: 3
    },
    item: {
        width: widthPromo,
        height: 155,
      
        position: 'relative',
        backgroundColor: '#FFAD00',
        overflow: 'hidden',
        borderRadius: 6,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
        width: "100%",
        height: 50

    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'stretch',
       
       width:'100%',
       

    },
    profileImage: {
        height: 50,
        width: 50,
        position: 'absolute',
        right: 0,
        // left:0,
        justifyContent: 'center',
        alignItems: 'center'

    },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default styles;