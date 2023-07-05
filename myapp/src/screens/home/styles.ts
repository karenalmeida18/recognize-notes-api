import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    camera: {
        flex: 1,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '85%',
        backgroundColor: 'white',
        width: '100%',
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        width: '70%',
        margin: 'auto',
        position: 'absolute',
    },
    buttonText: {
      color: '#1094ab',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
    },
    resultText: {
        position: 'absolute',
        top: '50%',
        zIndex: 20,
        margin: 'auto',
        width: '100%',
    }
})