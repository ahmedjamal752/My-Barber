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

export default function LoginForm() {
  const router = useRouter();
  const { loginAs } = useAppStore();

  const [role, setRole] = useState<"client" | "admin">("client");
  const [email, setEmail] = useState("client@mybarber.ma");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (newRole: "client" | "admin") => {
    setRole(newRole);
    if (newRole === "admin") {
      setEmail("admin@mybarber.ma");
    } else {
      setEmail("client@mybarber.ma");
    }
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Champs requis", "Veuillez renseigner votre email et mot de passe.");
      return;
    }

    loginAs(role, {
      email,
      name: role === "admin" ? "Karim Amrani (Admin)" : "Ahmed Jamaleddine",
    });

    if (role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/client");
    }
  };

  return (
    <View style={styles.container}>
      {/* Role Switcher */}
      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleTab, role === "client" && styles.activeRoleTab]}
          onPress={() => handleRoleChange("client")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="person-outline"
            size={16}
            color={role === "client" ? "#171717" : "#D8C3A5"}
          />
          <Text
            style={[styles.roleTabText, role === "client" && styles.activeRoleTabText]}
          >
            Client
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleTab, role === "admin" && styles.activeRoleTab]}
          onPress={() => handleRoleChange("admin")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="cut-outline"
            size={16}
            color={role === "admin" ? "#171717" : "#D8C3A5"}
          />
          <Text
            style={[styles.roleTabText, role === "admin" && styles.activeRoleTabText]}
          >
            Barbier / Admin
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Adresse Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="votre.email@exemple.com"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.label}>Mot de passe</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color="#B8955A" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
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
            size={20}
            color="#B8955A"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => Alert.alert("Mot de passe oublié", "Un lien de réinitialisation a été simulé par email.")}
      >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
        <Text style={styles.buttonText}>
          {role === "admin" ? "CONNEXION ADMIN" : "ACCÉDER À MON ESPACE"}
        </Text>
        <Ionicons name="arrow-forward" size={18} color="#171717" />
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text style={styles.registerPrompt}>Vous n'avez pas encore de compte ?</Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}> S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  roleSelector: {
    flexDirection: "row",
    backgroundColor: "#252525",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  roleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 9,
    gap: 8,
  },
  activeRoleTab: {
    backgroundColor: "#B8955A",
  },
  roleTabText: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
  },
  activeRoleTabText: {
    color: "#171717",
    fontWeight: "700",
  },
  label: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3A",
    marginBottom: 16,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#B8955A",
    fontSize: 13,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#B8955A",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#B8955A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.8,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  registerPrompt: {
    color: "#888",
    fontSize: 13,
  },
  registerLink: {
    color: "#B8955A",
    fontWeight: "bold",
    fontSize: 13,
  },
});
