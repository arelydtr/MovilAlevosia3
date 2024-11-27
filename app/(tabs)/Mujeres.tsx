import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import TabLayout from '../../app/(tabs)/_layout'; // Importa el componente de las tabs


const logo = require('../../assets/images/logo.png'); 
// Datos de ejemplo para las tarjetas de prendas
const products = [
  { 
    id: 1, 
    name: 'Shakira Rojo', 
    price: 950, 
    description: 'La nueva colección de fragancias de Shakira Perfumes se estrena con firmeza con ROJO', 
    image: require('../../assets/images/perfumerojo.jpeg') 
  },
  { 
    id: 2, 
    name: 'Vestido', 
    price: 500, 
    description: 'Vestido con estampado de corazón prenda romántica y femenina, un toque de dulzura', 
    image: require('../../assets/images/GUEST_5a0281b2-2efd-45cc-9e69-f6e1b676a8f5-edit-edit.jpg') 
  },
  {
    id: 3, 
    name: 'Saco', 
    price: 860, 
    description: 'Saco con diseño exclusivo para mujeres valientes', 
    image: require('../../assets/images/ropa2.jpg') 
  },
  {
    id: 4, 
    name: 'Vestido Unicorn Squa', 
    price: 500, 
    description: 'Pequeño vestido de manga larga para mujeres', 
    image: require('../../assets/images/unicorn_squad.jpg') 
  },
  {
    id: 5, 
    name: 'Vestido Azul', 
    price: 640, 
    description: 'Vestido Azul para mujer elegante', 
    image: require('../../assets/images/421567482_761463276009081_929801657867644709_n.jpg') 
  },
  {
    id: 6, 
    name: 'Chaqueta Gris', 
    price: 750, 
    description: 'Chaqueta para mujer color gris', 
    image: require('../../assets/images/squad_shirt.jpg') 
  },
  // Agrega más productos aquí
];

export default function Mujeres() {
  const isLoggedIn = false; // Variable para simular si el usuario está logueado o no

  return (
    <ScrollView style={styles.container}>
                    <Image
                source={logo} // Usa el logo
                style={styles.logo} // Aplica el estilo que desees
            />
      {/* Aquí inserta el logo */}
      {/* Aquí inserta el texto descriptivo */}
      <Text style={styles.description}>MUJERES</Text>

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
                <Text style={styles.loginButtonText}>Comprar</Text>
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
    backgroundColor: 'blue', // Cambié el color de fondo a azul
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold', // Añadí negrita al texto
  },
});
