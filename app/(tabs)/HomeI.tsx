import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Asset } from 'expo-asset';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa los íconos correctamente


// Importa las imágenes locales usando expo-asset
const logo = Asset.fromModule(require('../../assets/images/logo.png'));
const images = [
  Asset.fromModule(require('../../assets/images/main4.jpg')),
  Asset.fromModule(require('../../assets/images/main2.jpg')),
  Asset.fromModule(require('../../assets/images/main3.jpg')),
  Asset.fromModule(require('../../assets/images/main5.jpg')),
];
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: any; // Cambia esto si quieres un tipo más específico para las imágenes
}
// Datos de ejemplo para las tarjetas de prendas
const products: Product[] = [
    
  {
    id: 1,
    name: 'Vestido Unicorn Squa',
    price: 640,
    description: 'Pequeño vestido de manga larga para mujeres',
    image: Asset.fromModule(require('../../assets/images/unicorn_squad.jpg'))
  },
  {
    id: 2,
    name: 'Saco',
    price: 860,
    description: 'Saco con diseño exclusivo para mujeres valientes',
    image: Asset.fromModule(require('../../assets/images/ropa2.jpg'))
  },
  {
    id: 3,
    name: 'Playera FUN Tenis',
    price: 640,
    description: 'Playera roja con diseño cosido para hombres',
    image: Asset.fromModule(require('../../assets/images/fun_tenis.jpg'))
  },
  {
    id: 4,
    name: 'Vestido Floreado',
    price: 300,
    description: 'Vestido con diseño de flores',
    image: Asset.fromModule(require('../../assets/images/flower_dress.jpg'))
  },
];

function HomeScreen() {
  const [currentImageHome, setCurrentImageHome] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageHome((prevHome) => (prevHome + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = (product: Product) => {
    alert(`Has comprado: ${product.name} por $${product.price}`);
    // Aquí puedes agregar lógica adicional para registrar la compra o navegar
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: logo.uri }} style={styles.logo} />
      <Image source={{ uri: images[currentImageHome].uri }} style={styles.image} />
      <Text style={styles.description}>Nuestros Productos</Text>
      <View style={styles.cardsContainer}>
        {products.map(product => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image.uri }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <Text style={styles.cardPrice}>${product.price}</Text>

            {/* Botón de compra */}
            <TouchableOpacity 
              style={styles.buyButton}
              onPress={() => handlePurchase(product)}
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.profileText}>Este es tu perfil.</Text>
    </View>
  );
}

function HombresScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.profileText}>Sección para hombres.</Text>
    </View>
  );
}

function MujeresScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.profileText}>Sección para mujeres.</Text>
    </View>
  );
}

function SomosScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.profileText}>Quienes Somos.</Text>
    </View>
  );
}

// Configuración de Tabs
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer>
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
        Inicio: 'home-outline',
        Hombres: 'man-outline',
        Mujeres: 'woman-outline',
        'Quienes Somos': 'information-circle-outline',
      };

      const iconName = icons[route.name];

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="Inicio" component={HomeScreen} />
  <Tab.Screen name="Hombres" component={HombresScreen} />
  <Tab.Screen name="Mujeres" component={MujeresScreen} />
  <Tab.Screen name="Quienes Somos" component={SomosScreen} />
</Tab.Navigator>

</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    marginTop: 20,
    width: 380,
    height: 100,
  },
  image: {
    marginTop: 20,
    width: 380,
    height: 200,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,          // Tamaño de la fuente en las tarjetas
    fontWeight: 'bold',    // Peso de la fuente
    marginVertical: 5,
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
buyButton: {
  backgroundColor: 'rgb(0, 0, 255)',
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
},
buyButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 'bold',
},
});
