import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
     width: '100%',
     flex: 1,
     backgroundColor: 'white',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
    },
    description: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      marginTop: 24,
      marginBottom: 32,
    },
    button: {
      backgroundColor: '#1094ab',
      padding: 20,
      borderRadius: 30,
      width: '70%',
      margin: 'auto',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
})