import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeButtons() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/login")}
        activeOpacity={0.85}
      >
        <Text style={styles.loginText}>Se connecter</Text>
        <Ionicons name="arrow-forward" size={18} color="#171717" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
        activeOpacity={0.85}
      >
        <Text style={styles.registerText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push("/client")}
        activeOpacity={0.7}
      >
        <Ionicons name="eye-outline" size={16} color="#D8C3A5" />
        <Text style={styles.exploreText}>Explorer les services sans compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
  },
  loginButton: {
    backgroundColor: "#B8955A",
    paddingVertical: 16,
    paddingHorizontal: 20,
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
  loginText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  registerButton: {
    borderWidth: 1.5,
    borderColor: "#B8955A",
    backgroundColor: "rgba(184, 149, 90, 0.08)",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#F8F7F4",
    fontSize: 15,
    fontWeight: "600",
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  exploreText: {
    color: "#D8C3A5",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
