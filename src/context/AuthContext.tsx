import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Text } from 'react-native';
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

// Valores predeterminados del contexto
const AuthContextDefaultValues: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
};

export const AuthContext = createContext<AuthContextType>(AuthContextDefaultValues);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);


  const login = async (userData: any) => {
    try {
      console.log("Datos del usuario para guardar:", userData);
      console.log("Datos", userData.nombre);
      const token = userData.token; // Obtén el token
      const user = {
        id: userData.id_usuario,
        nombre: userData.nombre,
        email: userData.email,
        telefono: userData.telefono,
        puesto: userData.Puesto,
      };
      console.log(user);
      // Guarda el token y la información del usuario en SecureStore
      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userInfo", JSON.stringify(user));

      console.log("Usuario y token guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar datos:", error);
    }
  };


  const logout = () => {
    SecureStore.deleteItemAsync("userToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
