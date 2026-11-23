import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";

export default function RegisterForm() {
  const router = useRouter();
  const { loginAs, addClient } = useAppStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert("Champs incomplets", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Email invalide", "Veuillez entrer une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Sécurité", "Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    // Add client to store
    addClient({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: "Compte créé via l'application mobile",
    });

    // Auto login as client
    loginAs("client", {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    Alert.alert(
      "Bienvenue !",
      `Félicitations ${name}, votre compte My Barber a été créé avec succès.`,
      [
        {
          text: "Découvrir les services",
          onPress: () => router.replace("/client"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom complet</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ex : Ahmed Jamaleddine"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text style={styles.label}>Adresse email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="exemple@email.com"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.label}>Numéro de téléphone</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="+212 6XX XX XX XX"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.label}>Mot de passe</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Minimum 6 caractères"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={18}
            color="#B8955A"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmer le mot de passe</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="shield-checkmark-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Répéter le mot de passe"
          placeholderTextColor="#777"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Créer mon compte</Text>
        <Ionicons name="checkmark-circle-outline" size={20} color="#171717" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#F8F7F4",
    paddingVertical: 14,
    fontSize: 15,
  },
  eyeButton: {
    padding: 6,
  },
  button: {
    backgroundColor: "#B8955A",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    shadowColor: "#B8955A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
