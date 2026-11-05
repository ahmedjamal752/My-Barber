import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    Alert.alert(
      "Inscription",
      "Le formulaire est valide. La connexion à l'API sera ajoutée ensuite."
    );
   
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom complet</Text>
      <TextInput
        style={styles.input}
        placeholder="Ahmed Jamaleddine"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Adresse email</Text>
      <TextInput
        style={styles.input}
        placeholder="exemple@email.com"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="+212 6XX XX XX XX"
        placeholderTextColor="#777"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Minimum 8 caractères"
        placeholderTextColor="#777"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirmer le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Répéter le mot de passe"
        placeholderTextColor="#777"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
         onPress={() => router.push("/client")}
    
      >
        <Text  style={styles.buttonText}>Créer mon compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 10,
    padding: 15,
    color: "#F8F7F4",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#B8955A",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
  },
});