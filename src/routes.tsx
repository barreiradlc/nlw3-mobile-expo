import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from "./Pages/OrphanagesMap"
import OrphanageDetails from "./Pages/OrphanageDetails"

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="OrphanagesMap" component={OrphanagesMap} options={{ title: "Home" }} />
                <Screen name="OrphanageDetails" component={OrphanageDetails}  />
            </Navigator>
        </NavigationContainer>
    );
}