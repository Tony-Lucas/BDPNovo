import React, { useState } from "react";
import { Button, View, Image, Text, TextInput } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";

export default function NovaMercadoria({ navigation }) {

    const [foto, setFoto] = useState();
    const [uriFoto, setUriFoto] = useState();
    const [mostrarOpcao, setMostrarOpcao] = useState(false);
    const [nome, setNome] = useState();
    const [precoCompra, setPrecoCompra] = useState();
    const [precoVenda, setPrecoVenda] = useState();

    const showLibrary = () => {
        launchImageLibrary({ mediaType: "photo" }, response => {
            setFoto(response);
            setUriFoto(response.uri);
            console.log(response)
        })
        setMostrarOpcao(false)
    }

    const takePhoto = () => {
        launchCamera({ mediaType: "photo" }, response => {
            setFoto(response);
            setUriFoto(response.uri);
        })
        setMostrarOpcao(false)
    }

    const salvaMercadoria = async () => {
        if (nome && precoCompra && precoVenda && foto) {
            const corpo = new FormData()
            corpo.append("nome", nome);
            corpo.append("precoCompra", precoCompra);
            corpo.append("precoVenda", precoVenda);
            corpo.append("img", {
                name: foto.fileName,
                type: foto.type,
                uri: foto.uri
            })
            corpo.append("token", await AsyncStorage.getItem("token"))
            const result = await fetch("http://192.168.1.10:3333/mercadoria", {
                method: "post",
                body: corpo
            })
            const json = await result.json();
            if (json.success) {
                navigation.navigate("Mercadoria")
            }
        }
    }

    return (
        <React.Fragment>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginBottom: 25, fontSize: 23, fontFamily: "Ubuntu-Bold" }}>Nova Mercadoria</Text>
                <View style={{ width: "85%", alignItems: "center" }}>
                    <TextInput placeholder="Nome" style={{ backgroundColor: "white", borderRadius: 5, width: "100%" }} value={nome} onChangeText={text => setNome(text)} />
                    <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "space-between", width: "100%" }}>
                        <TextInput placeholder="Preço Compra" style={{ backgroundColor: "white", borderRadius: 5, width: "47%" }} value={precoCompra} onChangeText={text => setPrecoCompra(text)} />
                        <TextInput placeholder="Preço Venda" style={{ backgroundColor: "white", borderRadius: 5, width: "47%" }} value={precoVenda} onChangeText={text => setPrecoVenda(text)} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 22 }}>
                        <Text onPress={() => mostrarOpcao ? setMostrarOpcao(false) : setMostrarOpcao(true)} style={{ backgroundColor: "#0079FF", paddingTop: 8, paddingBottom: 8, paddingRight: 15, paddingLeft: 15, borderRadius: 5, color: "white" }}>Escolher Foto</Text>
                    </View>
                    {uriFoto && (
                        <Image source={{ uri: uriFoto }} style={{ width: "60%", height: "35%", marginTop: 25 }} />
                    )}
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%", marginTop: 22 }}>
                        <Text onPress={() => salvaMercadoria()} style={{ backgroundColor: "#2ecc71", paddingTop: 8, paddingBottom: 8, paddingRight: 15, paddingLeft: 15, borderRadius: 5, color: "white" }}>Salvar</Text>
                    </View>
                </View>
                {mostrarOpcao && (
                    <Animatable.View animation="fadeInUp" style={{ backgroundColor: "#fff", alignItems: "center", position: "absolute", bottom: 0, width: "100%" }}>
                        <Text style={{ padding: 15, width: "100%", textAlign: "center", fontFamily: "Ubuntu-Regular" }} onPress={() => takePhoto()}>Tira Foto</Text>
                        <Text style={{ padding: 15, width: "100%", textAlign: "center", fontFamily: "Ubuntu-Regular" }} onPress={() => showLibrary()}>Escolher da biblioteca</Text>
                        <Text style={{ padding: 15, width: "100%", textAlign: "center", fontFamily: "Ubuntu-Regular" }} onPress={() => mostrarOpcao ? setMostrarOpcao(false) : setMostrarOpcao(true)}>Cancelar</Text>
                    </Animatable.View>
                )}
            </View>
        </React.Fragment>
    )
}