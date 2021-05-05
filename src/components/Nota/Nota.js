import React, { useState } from "react"
import { View } from "react-native"
import { Button, TextInput, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Resumo() {

    useFocusEffect(
        React.useCallback(() => {

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 27, marginTop: 30, marginLeft: 23 }}>Resumo Hoje</Text>
            <View>

            </View>
        </View>
    )
}