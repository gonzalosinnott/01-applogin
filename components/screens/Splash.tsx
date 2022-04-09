import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Splash() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    ///Chage screen after 5 seconds
    setTimeout(() => {
        navigation.replace( 'Login' );
        }, 6000);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LottieView
        autoPlay
        loop = {false}
        source={require("D:/Tecnicatura_en_Programación/4° Cuatrimestre/PPS/01-applogin/assets/splash-screen.json")}
      />
    </View>
  );
}
