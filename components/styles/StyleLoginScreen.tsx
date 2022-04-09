import { StyleSheet } from 'react-native'

export default StyleSheet.create({
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
  buttonRole: {
    marginTop: 40,
    margin: 5,
    backgroundColor: '#ef7f1b',
    width: '30%',
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



