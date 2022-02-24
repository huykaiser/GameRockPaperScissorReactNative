import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export default class Button extends Component {
    render() {
        const { title, colors, onPress } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.buttonContainer]}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 60,
        width: 160,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    }
})