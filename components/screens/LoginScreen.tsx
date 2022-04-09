import { useNavigation  } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { auth } from '../database/firebase'
import styles from '../styles/StyleLoginScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserGear, faUsersRectangle, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-native-modal";

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const win = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressAdminHandler = () => {
    setEmail("admin@utn.com");
    setPassword("admin123");
  }

  const onPressTeacherHandler = () => {
    setEmail("docente@utn.com");
    setPassword("docente");
  }

  const onPressStudentHandler = () => {
    setEmail("alumno@utn.com");
    setPassword("alumno");
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(user => {
      if (user){
        navigation.replace('Inicio')
      }
    })

    return unsuscribe
  }, [])

  const handelSignUp = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registro de usuario como: ', user?.email);
        
      })
      .catch(error => {   
        switch (error.code) {  
            case 'auth/invalid-email':
              alert('INGRESE UN FORMATO DE MAIL VALIDO')
              break;                       
            case 'auth/email-already-in-use':
                alert('EL MAIL YA SE ENCUENTRA REGISTRADO')
                break;                    
            case 'auth/missing-email':
                alert('INGRESE MAIL')
                break;
            case 'auth/internal-error':
                alert('INGRESE CONTRASEÑA')
                break;
            default:
                alert(error.message)  
                break;   
        }
    })
  }

  const handleLogin = async () => {
      await auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Inicio de sesion como: ', user?.email);
        if (user){
          navigation.replace('Inicio')
        }
      })
      .catch(error => {   
        switch (error.code) { 
            case 'auth/invalid-email':
                alert('FORMATO DE MAIL INVALIDO')
                break;                  
            case 'auth/user-not-found':
                alert('USUARIO NO REGISTRADO')
                break;                
            case 'auth/wrong-password':
                alert('CONTRASEÑA INCORRECTA')
                break;
            case 'auth/internal-error':
                alert('INGRESE CONTRASEÑA')
                break;
            default:
                alert(error.message)  
                break; 
        }
    }) 
  } 

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={{
            width: win.width / 2,
            height: win.width / 2,
            resizeMode: "contain",
            alignSelf: "center",
          }}
          source={require("D:/Tecnicatura_en_Programación/4° Cuatrimestre/PPS/01-applogin/assets/logo.png")}
        />
        <Text style={styles.title}>PRACTICA PROFESIONAL SUPERVISADA</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>INICIAR SESION</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handelSignUp}
            style={[styles.button, styles.buttonOutLine]}
          >
            <Text style={styles.buttonOutLineText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onPressAdminHandler}  style={styles.buttonRole} >
            <FontAwesomeIcon icon={ faUserGear }  size={ 32 } />
            <Text style={styles.buttonText}>ADMIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressTeacherHandler} style={styles.buttonRole}>
            <FontAwesomeIcon icon={ faChalkboardTeacher }  size={ 32 } />
            <Text style={styles.buttonText}>DOCENTE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressStudentHandler} style={styles.buttonRole}>
            <FontAwesomeIcon icon={ faUsersRectangle }  size={ 32 } />
            <Text style={styles.buttonText}>ALUMNOS</Text>
          </TouchableOpacity>
        </View>        
      </View>      
      <View style={styles.footer}>
        <HideWithKeyboard>
          <Text>
            &copy; {new Date().getFullYear()} Copyright - Gonzalo Sinnott Segura
          </Text>
        </HideWithKeyboard>
      </View>

      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>

    </View>
  );
}

export default LoginScreen