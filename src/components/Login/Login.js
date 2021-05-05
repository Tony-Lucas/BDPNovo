import React, { useState } from "react"
import { Text, View } from "react-native"
import { Button, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {

    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();

    const logar = async () => {
        setIsLoading(true)
        if (usuario && senha) {
            const result = await fetch("https://baldosplasticosapi.herokuapp.com/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario: usuario, senha: senha })
            })
            const json = await result.json();
            await AsyncStorage.setItem("token", json.token);
            navigation.navigate("Navegacao");
        }
        setIsLoading(false);
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "75%", flexDirection: "column", flexWrap: "wrap" }}>
                <View>
                    <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 29 }}>Bem Vindo</Text>
                    <Text style={{ fontFamily: "Ubuntu-Light", fontSize: 26, marginTop: 10, marginBottom: 22 }}>Login</Text>
                </View>
                <View>
                    <TextInput placeholder="Usuario" type="flat" value={usuario} onChangeText={text => setUsuario(text)} />
                    <TextInput placeholder="Senha" type="flat" value={senha} onChangeText={text => setSenha(text)} secureTextEntry={true} style={{ marginTop: 20, marginBottom: 25 }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    <Button mode="contained" loading={isLoading} color="#0079FF" style={{ width: 150 }} onPress={() => logar()}>Entrar</Button>
                </View>
            </View>
        </View>
    )
}