import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { name as appName } from '../../../app.json';
import Storage from "../../models/Storage";

const Loading = ({ navigation }) => {

    const bootstrapAsync = async () => {
        try {
            const userToken = await Storage.getItem('userToken');
            navigation.navigate(userToken ? 'App' : 'Auth');
        }
        catch (error) {
            Alert.alert("Error: ", error.message);
        }
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        bootstrapAsync();
    });

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
            <Text style={styles.h1}>{appName}</Text>
                <ActivityIndicator />
                <StatusBar barStyle='dark-content' />
            </View >
        </ImageBackground>
    );
}

//set navigationOptions
// Loading.navigationOptions = {
//   header: null
// };

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    h1: {
        fontSize: 34,
        fontWeight: '600',
        color: "green"
    },
    btnText: {
        fontWeight: "600",
        fontSize: 19,
        textTransform: 'uppercase',
    },
});


export default Loading;