import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";
import React from "react";

export default function WelcomeButtons() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/admin")}
      >
        <Text style={styles.loginText}>
          Se connecter
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
          onPress={() => router.push("/register")}
        
      >
        <Text style={styles.registerText}>
          Créer un compte
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 15,
  },
  loginButton: {
    backgroundColor: "#B8955A",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    borderWidth: 1,
    borderColor: "#B8955A",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  registerText: {
    color: "#F8F7F4",
    fontSize: 16,
  },
});