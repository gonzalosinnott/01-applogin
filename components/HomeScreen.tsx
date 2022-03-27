 import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 import React from 'react'
import { auth } from './firebase'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
 
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
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#ef7f1b',
      width: '60%',
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: 80,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 18,
    },
 })

 export default HomeScreen
 
