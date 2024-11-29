import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useStripe } from "@stripe/stripe-react-native";

type CartItem = {
  id_carrito: number;
  id_producto: number;
  id_usuario: number;
  cantidad_producto: number;
  Nombre_Prenda: string;
  Descripcion_Prenda: string;
  Imagen_Prenda: string;
  Precio: number;
};

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false); // Estado para la carga de pago
  const userId = 26; // Reemplaza esto con el ID del usuario desde tu contexto o autenticación
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); // Stripe hooks

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://alev-backend-vercel.vercel.app/TraerCarrito/${userId}`
      );
      const data = await response.json();
      setCart(data);
      calculateTotal(data);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      Alert.alert('Error', 'No se pudo cargar el carrito.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (cartData: CartItem[]) => {
    const totalPrice = cartData.reduce(
      (acc, item) => acc + item.cantidad_producto * item.Precio,
      0
    );
    setTotal(totalPrice);
  };

  const handleIncrease = async (id: number) => {
    try {
      await fetch('https://alev-backend-vercel.vercel.app/AumentarCarro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: id }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error al aumentar cantidad:', error);
    }
  };

  const handleDecrease = async (id: number) => {
    const currentItem = cart.find((item) => item.id_carrito === id);
    if (currentItem && currentItem.cantidad_producto === 1) {
      return;
    }
    try {
      await fetch('https://alev-backend-vercel.vercel.app/QuirtarCarro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: id }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error al disminuir cantidad:', error);
    }
  };

  const handleRemove = (id: number) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => confirmRemove(id) },
      ]
    );
  };

  const confirmRemove = async (id: number) => {
    try {
      await fetch('https://alev-backend-vercel.vercel.app/EliminarCarro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito: id }),
      });
      fetchCart();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const initializePaymentSheet = async () => {
    try {
      setIsPaymentLoading(true);
      const response = await fetch(
        'https://rest-api2-three.vercel.app/api/create-payment-alevosia',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 1000, User: userId }),
        }
      );

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('No se pudo inicializar el PaymentSheet.');
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Mi Tienda', // Cambia por el nombre de tu tienda
      });

      if (error) {
        throw new Error(error.message || 'Error al inicializar el PaymentSheet.');
      }

      return true;
    } catch (error) {
      console.error('Error al inicializar el PaymentSheet:', error);
      Alert.alert('Error', 'No se pudo inicializar el formulario de pago.');
      return false;
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handlePurchase = async () => {
    const isPaymentSheetReady = await initializePaymentSheet();

    if (!isPaymentSheetReady) return;

    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert('Pago cancelado', error.message || 'El pago fue cancelado.');
      } else {
        Alert.alert('Pago exitoso', '¡El pago se realizó con éxito!');
        fetchCart(); 
      }
    } catch (error) {
      console.error('Error al presentar el PaymentSheet:', error);
      Alert.alert('Error', 'Hubo un problema al procesar el pago.');
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://alevosia.host8b.me/image/${item.Imagen_Prenda}` }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.Nombre_Prenda}</Text>
        <Text style={styles.description}>{item.Descripcion_Prenda}</Text>
        <Text style={styles.unitPrice}>Precio unitario: {item.Precio}</Text>
        <Text style={styles.total}>
          Total: {item.cantidad_producto * item.Precio}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecrease(item.id_carrito)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.cantidad_producto}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleIncrease(item.id_carrito)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id_carrito)}
        >
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (cart.length === 0) {
    return <Text >Tu carrito está vacío</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id_carrito.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <TouchableOpacity style={styles.paypalButton} onPress={handlePurchase}>
          <Text style={styles.paypalText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fdf4f1',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  unitPrice: {
    fontSize: 14,
    color: '#333',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  controls: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    backgroundColor: '#fdf4f1',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paypalButton: {
    backgroundColor: '#ffc439',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  paypalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003087',
  },
  cardButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
});

export default ShoppingCart;