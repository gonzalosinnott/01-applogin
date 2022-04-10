import { useNavigation  } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { auth } from '../database/firebase'
import styles from '../styles/StyleLoginScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserGear, faUsersRectangle, faChalkboardTeacher, faTimesCircle, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Modal from "react-native-modal";


const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const win = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
              setModalVisible(true);
              setErrorMsg('Formato de email incorrecto.');
              break;                       
            case 'auth/email-already-in-use':
              setModalVisible(true);
              setErrorMsg('El email ingresado ya esta registrado.');
              break;                    
            case 'auth/missing-email':
              setModalVisible(true);
              setErrorMsg('Ingrese el mail.');
              break; 
            case 'auth/internal-error':
              setModalVisible(true);
              setErrorMsg('Ingrese la contraseña.');
              break;
            default:
              setModalVisible(true);
              setErrorMsg('La contraseña debe tener mas de 6 caracteres');
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
              setModalVisible(true);
              setErrorMsg('Formato de email incorrecto.');
              break;                   
            case 'auth/user-not-found':
              setModalVisible(true);
              setErrorMsg('Usuario no registrado.');
              break;                 
            case 'auth/wrong-password':
              setModalVisible(true);
              setErrorMsg('Contraseña incorrecta.');
              break;
            case 'auth/internal-error':
              setModalVisible(true);
              setErrorMsg('Ingrese contraseña.');
              break;;
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

          <View style={styles.input}>
            <FontAwesomeIcon style={styles.inputImage} icon={ faEnvelope }  size={ 15 } />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.input}>
            <FontAwesomeIcon style={styles.inputImage} icon={ faKey }  size={ 15 } />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
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

        <View>
          <Modal style={styles.body} isVisible={isModalVisible}>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>{errorMsg}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.escapeButton}>
                <FontAwesomeIcon icon={ faTimesCircle }  size={ 32 } />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
      
    </View>
  );
}

export default LoginScreen