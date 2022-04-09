import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../database/firebase'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/StyleHomeScreen'

 
 const HomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text>A INICIADO SESION COMO: {auth.currentUser?.email}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignOut}>
          <Text style={styles.buttonText}>CERRAR SESION</Text>
      </TouchableOpacity>
    </View>
   )
 }

 export default HomeScreen
 
