import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginFooter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/")}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back-outline" size={16} color="#B8955A" />
        <Text style={styles.link}>Retour à l'accueil</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        © 2026 My Barber. Tous droits réservés.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 25,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  link: {
    color: "#B8955A",
    fontSize: 14,
    fontWeight: "600",
  },
  footerText: {
    color: "#666",
    fontSize: 12,
  },
});
