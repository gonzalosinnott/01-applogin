import { useNavigation  } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { auth } from './firebase'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const win = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace('Inicio')
      }
    })

    return unsuscribe
  }, [])

  const handelSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registro de usuario como: ', user?.email);
        
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Inicio de sesion como: ', user?.email);
        if (user){
          navigation.replace('Inicio')
        }
      })
      .catch(error => alert(error.message))
  } 

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image  
          style={{  
            width: win.width/2,
            height: win.width/2,
            resizeMode: "contain",
            alignSelf: "center"}}
          source={require('D:/Tecnicatura_en_Programación/4° Cuatrimestre/PPS/01-applogin/assets/logo.png')}
        />
        <Text style={styles.title}>PRACTICA PROFESIONAL SUPERVISADA</Text>
        <View style={styles.inputContainer}>
            <TextInput
              placeholder = "Email"
              value = { email }
              onChangeText = { text => setEmail(text) }
              style = {styles.input}                  
            />
            <TextInput
              placeholder = "Contraseña"
              value = { password }
              onChangeText = { text => setPassword(text) }
              style = {styles.input}
              secureTextEntry                 
            />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}            
          >
            <Text style={styles.buttonText}>INICIAR SESION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ handelSignUp }
            style={[styles.button, styles.buttonOutLine]}            
          >
            <Text style={styles.buttonOutLineText}>REGISTRARSE</Text>
          </TouchableOpacity>        
        </View>
      </View>
      <View  style={styles.footer}>
        <HideWithKeyboard>
            <Text>
                &copy; {new Date().getFullYear()} Copyright - Gonzalo Sinnott Segura
            </Text>
        </HideWithKeyboard>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width: '80%',      
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#ef7f1b',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonOutLine: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#ef7f1b',
    borderWidth: 2,
  },
  buttonOutLineText: {
    color: '#ef7f1b',
    fontWeight: '700',
    fontSize: 18,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  body: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',     
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
  },
});

export default LoginScreen