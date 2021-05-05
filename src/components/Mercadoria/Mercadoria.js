import React, { useState } from "react";
import { View, Button, TextInput, Image, ScrollView } from "react-native";
import { Text, ActivityIndicator } from 'react-native-paper';
import Svg, { Path } from "react-native-svg"
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Mercadoria({ navigation }) {

    const [mercadorias, setMercadorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {

            const getMercadorias = async () => {
                setLoading(true)
                const result = await fetch(`http://192.168.1.10:3333/mercadoria/limite/0`);
                const json = await result.json();
                
                if (json.mercadorias) {
                    setMercadorias(json.mercadorias)
                }
                setLoading(false)
            }

            getMercadorias()

            return () => {
                setMercadorias([]);
                setLoading(false)
            };
        }, [])
    );

    return (
        <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>

            <View style={{ height: "20%" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30, marginBottom: 25, alignItems: "center" }}>
                    <Text style={{ fontFamily: "Ubuntu-Bold", fontSize: 27 }}>Mercadorias</Text>
                    <Text onPress={() => navigation.navigate("NovaMercadoria")} style={{ fontFamily: "Ubuntu-Regular", backgroundColor: "#0079FF", color: "#fff", paddingTop: 12, paddingBottom: 12, paddingRight: 20, paddingLeft: 20, borderRadius: 5 }}>Nova</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <View style={{ width: "80%" }}>
                        <TextInput style={{ backgroundColor: "white", borderRadius: 4 }} />
                    </View>
                    <View>
                        <Text style={{ color: "#ffffff", backgroundColor: "#0079FF", paddingTop: 10, paddingBottom: 10, paddingRight: 23, paddingLeft: 23 }}>
                            <Svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <Path
                                    d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                                    stroke="#fff"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </Text>
                    </View>
                </View>
            </View>
            {loading && (
                <View style={{ flex: 1, height: "80%", justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator animating={loading} size="large" color="gray" />
                </View>
            )}
            {!loading && (
                <View style={{ flex: 1, height: "80%" }}>
                    <Text style={{ marginTop: 15, fontFamily: "Ubuntu-Bold", fontSize: 18 }}>Resultados</Text>
                    <ScrollView>
                    {mercadorias.map(item => {
                        return (
                            
                                <View style={{ marginTop: 18, flexDirection: "column", backgroundColor: "#fff", fontFamily: "Ubuntu-Regular", fontSize: 17, paddingTop: 15, paddingBottom: 15 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ marginLeft: 18, fontFamily: "Ubuntu-Regular" }}>{item.nome}</Text>
                                            <View style={{ flexDirection: "row", marginTop: 14 }}>
                                                <Text style={{ marginLeft: 18 }}>{item.precoCompra.toString().replace(".", ",")}</Text>
                                                <Text style={{ marginLeft: 18 }}>{item.precoVenda.toString().replace(".", ",")}</Text>
                                                
                                            </View>
                                        </View>
                                        
                                        <View style={{ flexDirection: "row", marginRight: 18 }}>
                                            <Text style={{ backgroundColor: "#eb4d4b", padding: 10, marginRight: 15, borderRadius: 5 }}>
                                                <Svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <Path
                                                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM14 11v6M10 11v6"
                                                        stroke="#fff"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </Svg>
                                            </Text>
                                            <Text style={{ backgroundColor: "#f9ca24", padding: 10, borderRadius: 5 }}>
                                                <Svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <Path
                                                        d="M17 3a2.827 2.827 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                                                        stroke="#fff"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </Svg>
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            
                        )
                    })}
                    </ScrollView>
                </View>
            )}
        </View>
    )
}