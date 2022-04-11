import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Splash() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const win = Dimensions.get('window');

    setTimeout(() => {
        navigation.replace( 'Login' );
        }, 2800);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground style={{width: win.width ,
                              height: win.width ,
                              alignSelf: "center",}}  
                        source={require('D:/Tecnicatura_en_Programación/4° Cuatrimestre/PPS/01-applogin/assets/splash.gif')} />
    </View>
  );
}
