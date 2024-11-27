import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import TabLayout from './_layout'; // Importa el componente de las tabs

// Importa el logo y las imágenes
const logo = require('../../assets/images/logo.png'); // Cambia la ruta si es necesario
const icon = require('../../assets/images/icon.png'); // Asegúrate de que la ruta a icon.png sea correcta

const images = [
    require('../../assets/images/main4.jpg'), 
    require('../../assets/images/main2.jpg'),
    require('../../assets/images/main3.jpg'),
    require('../../assets/images/main5.jpg'),
];

// Datos de ejemplo para las tarjetas de prendas
const products = [
    { 
        id: 1, 
        name: 'Vestido Unicorn Squa', 
        price: 640, 
        description: 'Pequeño vestido de manga larga para mujeres', 
        image: require('../../assets/images/unicorn_squad.jpg') 
    },
    { 
        id: 2, 
        name: 'Saco', 
        price: 860, 
        description: 'Saco con diseño exclusivo para mujeres valientes', 
        image: require('../../assets/images/ropa2.jpg') 
    },
    {
      id: 3, 
        name: 'Playera FUN Tenis', 
        price: 640, 
        description: 'Playera roja con diseño cosido para hombres', 
        image: require('../../assets/images/fun_tenis.jpg') 
    },
    {
      id: 4, 
        name: 'Vestido Floreado', 
        price: 300, 
        description: 'Vestido con diseño de flores', 
        image: require('../../assets/images/flower_dress.jpg') 

    },
    { 
        id: 5, 
        name: 'Jeans Levis', 
        price: 950, 
        description: 'Pantalon de Mezclilla para hombres', 
        image: require('../../assets/images/levis_jeans.jpg') 
    },
    { 
        id: 6, 
        name: 'Navaja Suiza', 
        price: 860, 
        description: 'Navaja todo en uno multifuncional', 
        image: require('../../assets/images/navaja_suiza.jpg') 
    },
    
];


export default function Index() {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Cambia la imagen cada 5 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    const isLoggedIn = false; // Variable para simular si el usuario está logueado o no

    return (
        <ScrollView style={styles.container}>
            {/* Aquí inserta el logo */}
            <Image
                source={logo} // Usa el logo
                style={styles.logo} // Aplica el estilo que desees
            />

            {/* Aquí inserta la imagen que cambia */}
            <Image
                source={images[currentImageIndex]} // Usa la imagen actual
                style={styles.image} // Aplica el estilo que desees
            />

            {/* Aquí inserta el texto descriptivo */}
            <Text style={styles.description}>Nuestros Productos</Text>

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
        width: 380,          // Ajusta el ancho del logo
        height: 100,         // Ajusta el alto del logo
    },
    image: {
        position: 'absolute', // Hace que la imagen sea estática
        top: 150,             // Ajusta la posición desde la parte superior
        width: 380,           // Ancho de la imagen
        height: 200,          // Alto de la imagen
    },
    description: {
        fontSize: 20,         // Tamaño de la fuente
        fontWeight: 'bold',   // Peso de la fuente
        color: '#333',        // Color del texto
        marginTop: 385,       // Espacio desde la imagen hasta el texto
        textAlign: 'center',   // Centra el texto
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
