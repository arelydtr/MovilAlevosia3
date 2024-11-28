import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PoliticaPrivacidad() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Card Component */}
            <View style={styles.card}>
                <Text style={styles.title}>Política de Privacidad</Text>
                <Text style={styles.text}>
                    Alevosía, con domicilio en Calle Zacatecas 1, Colonia Centro, Ciudad Huejutla de Reyes, Municipio o Delegación Huejutla, C.P. 43000, en la entidad de Hidalgo, país México, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente: 
                </Text>

                <Text style={styles.title}>1. Almacenamiento y Compartición de Datos Personales:</Text>
                <Text style={styles.text}>
                    Los datos personales se almacenan de manera segura y solo se comparten con terceros necesarios para completar los pedidos (por ejemplo, empresas de envío). Mantenemos medidas de seguridad para proteger los datos contra acceso no autorizado. Los datos personales que se emplean son: 
                </Text>

                {/* Botón "Volver" */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    text: {
        fontSize: 16,
        textAlign: 'justify',
        color: '#555',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
        marginVertical: 20,
    },
    button: {
        backgroundColor: 'rgb(139, 101, 30)',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 10,
      },
     buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },

});
