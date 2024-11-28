import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Button,
  Alert
} from 'react-native';
import useAuth from '../../src/context/UseAuth'; // Asegúrate de importar correctamente tu contexto de autenticación
import { useRouter } from 'expo-router';

const logo = require('../../assets/images/logo.png'); // Cambia la ruta si es necesario

const images = [
  require('../../assets/images/main4.jpg'),
  require('../../assets/images/main2.jpg'),
  require('../../assets/images/main3.jpg'),
  require('../../assets/images/main5.jpg'),
];

type Product = {
  ID_Prenda: string;
  Nombre: string;
  CodBarras: string;
  Descripcion: string;
  ID_Marca: string;
  ID_Color: string;
  ID_Categoria: string;
  ID_TallaPantalon: string;
  ID_TallaPlayera: string;
  ID_Estilo: string;
  ID_Tipo: string;
  Precio: string;
  Imagen: string;
};

export default function Index() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para el control de actualización
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user, logout } = useAuth(); // Traemos los datos del usuario autenticado y la función logout
  const router = useRouter();

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Cambia la imagen cada 4 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch("https://alev-backend-vercel.vercel.app/productosGeneral");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true); // Activa el indicador de actualización
    await obtenerProductos();
    setRefreshing(false); // Desactiva el indicador de actualización
  };

  const handleLogout = () => {
    console.log(user);
    logout();
    router.replace('/login'); // Redirige al login después de cerrar sesión
  };

  // Función para insertar el producto en el carrito
  const InsertarCarrito = async (prodicto: { usuario: number; producto: string }) => {
    try {
      const response = await fetch("https://alev-backend-vercel.vercel.app/InsertarCarro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prodicto),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al insertar en el carrito:", error);
      throw error;
    }
  };

  // Función para manejar la compra
  const comprar = async (id: string) => {
    try {
      const prodicto = {
        usuario: 26,
        producto: id,
      };
      const response = await InsertarCarrito(prodicto);
      Alert.alert("Éxito", "Producto agregado al carrito.");
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el producto al carrito.");
    }
  };
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Imagen cambiante */}
      <Image source={images[currentImageIndex]} style={styles.image} />

      {/* Título */}
      <Text style={styles.description}>Nuestros Productos</Text>

      {/* Lista de productos */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.cardsContainer}>
          {productos.map((product) => (
            <View key={product.ID_Prenda} style={styles.card}>
              <Image
                source={{ uri: `https://alevosia.host8b.me/image/${product.Imagen}` }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{product.Nombre}</Text>
              <Text style={styles.cardDescription}>{product.Descripcion}</Text>
              <Text style={styles.cardPrice}>${product.Precio}</Text>
              <TouchableOpacity style={styles.loginButton} onPress={() => comprar(product.ID_Prenda)}>
                <Text style={styles.loginButtonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      < TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    position: 'absolute',
    top: 50,
    width: 380,
    height: 100,
  },
  image: {
    position: 'absolute',
    top: 150,
    width: 380,
    height: 200,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 385,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  card: {
    width: '48%',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
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
