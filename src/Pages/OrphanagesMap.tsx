import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from "@expo/vector-icons"

import mapMarker from "../images/Marker/Local.png";

import { useFonts } from "expo-font"
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap() {
    const navigation = useNavigation()
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    function handleGoToDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold
    })

    useEffect(() => {
        getOrphanages()
    }, [])

    async function getOrphanages() {
        const { data } = await api.get("/orphanages")
        setOrphanages(data)
    }

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -15.8429902,
                    longitude: -48.1101308,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >
                {orphanages.map(orphanage =>

                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.9
                        }}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                    >
                        <Callout tooltip onPress={() => handleGoToDetails(orphanage.id)}>
                            <View style={styles.calloutview}></View>
                            <Text style={styles.calloutviewtext}>{orphanage.name}</Text>
                        </Callout>
                    </Marker>

                )}

            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} Orfanato{orphanages.length !== 1 && "s"} encontrado{orphanages.length !== 1 && "s"}</Text>
            </View>

            <TouchableOpacity style={styles.createOrphanagesButton} onPress={() => alert("Alou")}>
                <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutview: {
        elevation: 2,
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 16,
        alignContent: "center",
        justifyContent: "center"
    },
    calloutviewtext: {
        textAlign: "center",
        left: 10,
        bottom: 15,
        position: "absolute",
        color: "#0089a5",
        fontSize: 14,
        fontFamily: "Nunito_700Bold"
    },
    footer: {
        elevation: 3,
        position: "absolute",
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: "#fff",
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    footerText: {
        color: '#8fa7b3',
        fontFamily: "Nunito_700Bold"
    },
    createOrphanagesButton: {
        width: 56,
        height: 56,
        backgroundColor: "#15c3d6",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 32,
        right: 25,
        zIndex: 232323
    },
});
