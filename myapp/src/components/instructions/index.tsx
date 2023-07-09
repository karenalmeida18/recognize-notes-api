import React, { useEffect } from 'react'

import { styles } from './styles'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Toast from 'react-native-toast-message'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Camera, PermissionResponse } from 'expo-camera'
import * as Speech from 'expo-speech'

const Welcome = require('../../images/welcome.png')

type StackParamsList = {
  home: undefined
  instructions: undefined
}

const text = 'Olá! Bem vindo ao aplicativo. Para navegar para a próxima tela, basta acionar o botão abaixo, ou dar um duplo toque em qualquer lugar da tela.'
const speakText = (text: string) => Speech.speak(text, { language: 'pt-BR' })
const showToast = (text: string, type = 'success') =>
  Toast.show({ text1: text, type, topOffset: 200 })

export default function Instructions({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'instructions'>) {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  useEffect(() => {
    const verifyPermission = async () => {
      const { status } = (await requestPermission()) as PermissionResponse
      if (status !== 'granted') showToast('Permissão negada para usar a câmera')
    }

    verifyPermission();
    speakText(text);
  }, []);

  const handleNextScreen = () => {
    const alertText = 'Dê permissão ao aplicativo usar a câmera para prosseguir';
    if (!permission?.granted) {
        showToast(alertText);
        speakText(alertText);
    } else navigation.navigate('home');
  };

  const handleGesture = Gesture.Tap().numberOfTaps(2).onStart(() => handleNextScreen());

  return (
    <GestureDetector gesture={handleGesture}>
        <View style={styles.container} accessible={true}>
        <Image
            source={Welcome}
            style={{ width: '100%', height: '45%', marginBottom: 52 }}
        />
        <Text style={styles.title}>Boas vindas!</Text>
        <Text style={styles.description}>{text}</Text>
        <TouchableOpacity
            style={styles.button}
            disabled={!permission?.granted}
            aria-disabled={!permission?.granted}
            onPress={() => handleNextScreen()}
        >
            <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
        </View>
    </GestureDetector>
  )
}
