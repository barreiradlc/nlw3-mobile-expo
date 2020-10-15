import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from "@expo/vector-icons"

import mapMarker from "./src/images/Marker/Local.png";

import { useFonts } from "expo-font"
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold
  })

  if(!fontsLoaded) return null;

  return <Routes />
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
    left:24,
    right:24,
    bottom: 32,

    backgroundColor: "#fff",
    borderRadius: 20,
    height:56,
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
    zIndex:232323
  },
});
