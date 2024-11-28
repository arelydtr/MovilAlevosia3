import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

type Product = {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  image?: string; // URL de imagen
};

const ShoppingCart = () => {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: 'Zurg Men',
      description: 'Playera con estampado del personaje Zurg',
      unitPrice: 280,
      quantity: 6,
      image: 'https://example.com/zurg-men-shirt.jpg',
    },
    {
      id: 2,
      name: 'Chaqueta amarilla',
      description: 'Chaqueta amarilla invernal',
      unitPrice: 500,
      quantity: 2,
      image: 'https://example.com/yellow-jacket.jpg',
    },
  ]);

  const handleIncrease = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.unitPrice}>Precio unitario: {item.unitPrice}</Text>
        <Text style={styles.total}>
          Total: {item.unitPrice * item.quantity}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDecrease(item.id)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleIncrease(item.id)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}
        >
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.paypalButton}>
          <Text style={styles.paypalText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardText}>Tarjeta de débito o crédito</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Desarrollado por PayPal</Text>
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
