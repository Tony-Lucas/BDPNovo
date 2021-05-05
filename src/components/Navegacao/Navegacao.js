import React from "react"
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

import Resumo from "../Resumo/Resumo";
import Mercadoria from "../Mercadoria/Mercadoria";
import Nota from "../Nota/Nota";

export default function Navegacao(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Resumo" component={Resumo}/>
            <Drawer.Screen name="Mercadoria" component={Mercadoria} />
            <Drawer.Screen name="Nota" component={Nota} />
        </Drawer.Navigator>
    )
}