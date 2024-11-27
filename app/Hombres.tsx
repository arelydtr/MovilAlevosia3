import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import TabLayout from '../app/(tabs)/_layout'; // Importa el componente de las tabs

// Importa el logo

// Datos de ejemplo para las tarjetas de prendas
const products = [
    { 
        id: 1, 
        name: 'Jeans Levis', 
        price: 950, 
        description: 'Pantalon de Mezclilla para hombres', 
        image: require('../assets/images/levis_jeans.jpg') 
    },
    { 
        id: 2, 
        name: 'Navaja Suiza', 
        price: 860, 
        description: 'Navaja todo en uno multifuncional', 
        image: require('../assets/images/navaja_suiza.jpg') 
    },
    {
        id: 3, 
        name: 'Chaqueta amarilla', 
        price: 500, 
        description: 'Chaqueta amarilla invernal estilo audaz y vibrante.', 
        image: require('../assets/images/LMYNL_CD.jpg') 
    },
    {
        id: 4, 
        name: 'Zurg Men', 
        price: 280, 
        description: 'Playera con estampado del personaje Zurg', 
        image: require('../assets/images/zurg_men.jpg') 
    },
    {
        id: 5, 
        name: 'Playera Bugs Bunny', 
        price: 640, 
        description: 'Playera con un estampado de Bugs Bunny', 
        image: require('../assets/images/bugs_bunny.jpg') 
    },
    {
        id: 6, 
        name: 'Playera FUN Tenis', 
        price: 640, 
        description: 'Playera roja con diseño cosido para hombres', 
        image: require('../assets/images/fun_tenis.jpg') 
    },
    // Agrega más productos aquí
];

export default function Hombres() {
    const isLoggedIn = false; // Variable para simular si el usuario está logueado o no

    return (
        <ScrollView style={styles.container}>
            {/* Aquí inserta el logo */}
            

            {/* Aquí inserta el texto descriptivo */}
            <Text style={styles.description}>HOMBRES</Text>

            {/* Aquí se agregan las tarjetas de presentación */}
            <View style={styles.cardsContainer}>
                {products.map(product => (
                    <View key={product.id} style={styles.card}>
                        <Image source={product.image} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{product.name}</Text>
                        <Text style={styles.cardDescription}>{product.description}</Text>
                        <Text style={styles.cardPrice}>${product.price}</Text>

                        {/* Mostrar un botón si el usuario no ha iniciado sesión */}
                        {!isLoggedIn ? (
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Debes iniciar sesión para poder comprar</Text>
                            </TouchableOpacity>
                        ) : (
                            <Button title="Comprar" onPress={() => { /* acción de compra */ }} />
                        )}
                    </View>
                ))}
            </View>

            <TabLayout />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8', // Fondo claro
    },
    logo: {
        position: 'absolute', // Hace que el logo sea estático
        top: 50,              // Ajusta la posición desde la parte superior
        width: 380,           // Ajusta el ancho del logo
        height: 100,          // Ajusta el alto del logo
    },
    description: {
        fontSize: 25,         // Tamaño de la fuente
        fontWeight: 'bold',   // Peso de la fuente
        color: '#333',        // Color del texto
        marginTop: 150,       // Espacio desde la parte superior hasta el texto
        textAlign: 'center',  // Centra el texto
    },
    cardsContainer: {
        flexDirection: 'row',       
        flexWrap: 'wrap',          
        justifyContent: 'space-around', // Espacia las tarjetas de manera más equilibrada
        marginTop: 20,             
        paddingHorizontal: 5,     
    },
    card: {
        width: '48%',          // Ajusta el ancho de cada tarjeta (48% para que quepan dos con margen)
        borderRadius: 10,      // Bordes redondeados
        marginBottom: 20,      // Espacio inferior entre las tarjetas
        backgroundColor: '#fff', // Fondo blanco para las tarjetas
        shadowColor: '#000',   // Sombra para dar profundidad
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,          // Efecto de elevación para Android
        alignItems: 'center',  // Centra el contenido de la tarjeta
        padding: 10,           // Espaciado interno
    },
    cardImage: {
        width: '100%',         // Ajusta el ancho de la imagen de la tarjeta
        height: 150,           // Altura de la imagen de la tarjeta
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 16,          // Tamaño de la fuente en las tarjetas
        fontWeight: 'bold',    // Peso de la fuente
        marginVertical: 5,     // Espacio vertical
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: '#888',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 10,
    },
});
