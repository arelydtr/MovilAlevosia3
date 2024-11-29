import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PasswordReset() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de restablecimiento de contraseña</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
