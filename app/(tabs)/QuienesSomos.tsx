import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const logo = require('../../assets/images/logo.png');

export default function QuienesSomos() {
    const router = useRouter();

    // Función para manejar la navegación
    const handlePrivacyPolicyPress = () => {
        router.push({ pathname: '/PoliticaPrivacidad' }); // Cambia a un objeto
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.banner}>
                <Image source={logo} style={styles.logo} />
            </View>
            
            <View style={styles.card}>
                <Text style={styles.boutiqueName}>ALEVOSÍA BOUTIQUE</Text>
                <View style={styles.details}>
                    <Text style={styles.detailsText}>
                        Alevosía es un comercio minorista de prendas y accesorios ubicado en el centro de la ciudad de 
                        Huejutla de Reyes, Hidalgo, que se enfoca en dar un estilo de vida fresco a la juventud huejutlense 
                        desde 2009. A lo largo de los años Alevosía se ha caracterizado por vender prendas a la moda y que 
                        esté al alcance del público.
                    </Text>
                </View>
                <Text style={styles.sectionTitle}>Misión</Text>
                <Text style={styles.sectionText}>
                    Vestir jóvenes que siguen tendencias de un mundo que evoluciona, gente que desea diferenciarse, 
                    jóvenes con un toque de rebeldía que crean un estilo sencillo y fuerte a la vez.
                </Text>
                <Text style={styles.sectionTitle}>Visión</Text>
                <Text style={styles.sectionText}>
                    Alevosía es una boutique UNISEX, dedicada a la venta de ropa de dama y caballero y la organización 
                    de pasarelas, expo de novias y certámenes de modelaje, que es líder en su segmento y crea una 
                    plataforma para el lanzamiento de nuevos talentos creativos y chavas y chavos que aspiran a 
                    convertirse en modelos profesionales.
                </Text>
                <Text style={styles.sectionTitle}>Propósitos</Text>
                <Text style={styles.sectionText}>
                    Convertirnos y mantenernos posteriormente como una de las empresas más eficientes de la región y 
                    del estado logrando un prestigio y al mismo tiempo que los clientes obtengan soluciones buenas 
                    y rápidas.
                </Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handlePrivacyPolicyPress}>
                    <Text style={styles.footerText}>Política de privacidad</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}>© 2024 Creado por Alevosía Boutique</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    banner: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 380,
        height: 100,
        resizeMode: 'contain',
        top: 10,
    },
    boutiqueName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: '#000',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    details: {
        marginBottom: 20,
    },
    detailsText: {
        fontSize: 16,
        textAlign: 'justify',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 15,
    },
    footer: {
        marginTop: 30,
        paddingVertical: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    footerText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
});
