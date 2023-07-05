import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
     position: 'absolute',
     zIndex: 10,
     width: '100%',
     display: 'flex',
     alignItems: 'center',
    },
    content: {
      backgroundColor: '#fff',
      width: '60%',
      borderRadius: 8,
      height: '100%',
      opacity: 0.9,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      paddingVertical: 20,
      fontWeight: '600',
    },
    divider: {
      backgroundColor: 'lightgray',
      shadowOpacity: 0,
      width: '100%',
      height: '2%',
    },
    button: {
      width: '100%',
      textAlign: 'center',
      paddingVertical: 14,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#1094ab',
      fontWeight: '700',
    }
})