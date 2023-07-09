import { useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { Camera, CameraCapturedPicture } from 'expo-camera'
import * as Speech from 'expo-speech'
import Popup from '../../components/popup'

import { styles } from './styles';

export function Home() {
  const [permission] = Camera.useCameraPermissions()
  const [camera, setCamera] = useState<Camera | null>(null)
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>()
  const [imageResult, setImageResult] = useState('')
  const [loading, setLoading] = useState(false);

  const showToast = (text: string, type = 'success') => Toast.show({ text1: text, type, topOffset: 200 })
  const speakText = (text: string) => Speech.speak(text, { language: 'pt-BR' })
  const mapClassListToText = (resultClass: string) => {
    const [noteText, noteNumber] = resultClass.split('-')
    return `Nota ${noteNumber} reconhecida`
  }

  const handleCameraCapture = async () => {
    setImageResult('');
    setLoading(true);
    speakText('Aguarde um momento, o resultado está sendo processado');
    try {
      if (camera) {
        const image = await camera.takePictureAsync()
        setCapturedImage(image)
        const formData = new FormData()
        // @ts-expect-error - ignore
        formData.append('image', {
          uri: image.uri,
          name: 'image.jpg',
          type: 'image/jpg',
        })
        const { data: { data = {} } = {} } = await axios.post(
          'https://recognize-notes-api.onrender.com/recognize-banknotes',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        const resultFormatted = mapClassListToText(data.class)
        setImageResult(resultFormatted)
        speakText(resultFormatted)
      }
    } catch (err) {
      console.log({ err });
      const text = 'Ocorreu um erro inesperado. Tente novamente';
      showToast(text, 'error')
      speakText(text)
    } finally {
      setLoading(false)
    }
  }

  const handleGesture = Gesture.Tap().numberOfTaps(2).onStart(() => handleCameraCapture());

  return (
    <View style={styles.container} accessibilityLanguage="pt-BR" accessible={true}>
      {imageResult && (
        <Popup text={imageResult} onPress={() => setImageResult('')} />
      )}
      {loading && (
        <ActivityIndicator
          style={styles.resultText}
          size="large"
          accessibilityRole="progressbar"
          accessibilityLabel="Aguarde um momento, o resultado está sendo processado"
          color="#1094ab"
        />
      )}
      {permission?.granted && (
        <GestureDetector gesture={handleGesture}>
          <Camera style={styles.camera} ref={(ref) => ref && setCamera(ref)} />
        </GestureDetector>
      )}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          accessible={true}
          disabled={loading}
          aria-disabled={loading}
          accessibilityLabel="Aperte o botao para capturar a nota"
          onPress={handleCameraCapture}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Capturar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
