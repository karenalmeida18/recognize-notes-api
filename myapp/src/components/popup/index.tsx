import React from 'react';

import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Popup({ text, onPress }: { text: string, onPress: () => void }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>
                    {text}                
                </Text>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.button} onPress={() => onPress()}>
                    <Text style={styles.buttonText}> Ok </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}