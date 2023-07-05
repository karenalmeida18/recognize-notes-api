import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as Speech from 'expo-speech';
import Popup from '../../components/popup';

import { styles } from './styles';

export function Home() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState<Camera | null>(null);
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>();
  const [imageResult, setImageResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  const showToast = (text: string, type = 'success') =>  Toast.show({ text1: text, type, topOffset: 200 });
  const speakText = (text: string) => Speech.speak(text, { language: 'pt-BR' });
  const mapClassListToText = (resultClass: string) => {
    const [noteText, noteNumber] = resultClass.split('-');
    return `Nota ${noteNumber} reconhecida`;
  };

  useEffect(() => {
    const verifyPermission = async () => {
      await requestPermission();
      if (!permission?.granted) showToast('Permissão negada para usar a câmera');
    };

    verifyPermission();
  }, [])

  const handleCameraCapture = async () => {
    setLoading(true);
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
        const { data: { data  = {} } = {} } = await axios.post(
          'http://192.168.2.104:1900/recognize-banknotes',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        const resultFormatted = mapClassListToText(data.class);
        setImageResult(resultFormatted);
        speakText(resultFormatted);
      }
    } catch (err) {
      const text = 'Ocorreu um erro inesperado. Tente novamente';
      showToast(text, 'error')
      speakText(text);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <View style={styles.container}>
      {imageResult && <Popup text={imageResult} onPress={() => setImageResult('')}/>}
      {loading && <ActivityIndicator style={styles.resultText} size="large" />}
      {permission?.granted && <Camera style={styles.camera} ref={(ref) => ref && setCamera(ref)} />}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={handleCameraCapture} style={styles.button}>
          <Text style={styles.buttonText}>Capturar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}