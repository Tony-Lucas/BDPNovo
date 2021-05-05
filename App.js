import React from "react"
import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/Login/Login";
import { Provider as PaperProvider } from 'react-native-paper';
import Navegacao from "./src/components/Navegacao/Navegacao";
import NovaMercadoria from "./src/components/Mercadoria/NovaMercadoria";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Navegacao" component={Navegacao} />
          <Stack.Screen name="NovaMercadoria" component={NovaMercadoria} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}