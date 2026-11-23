import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="cut" size={28} color="#B8955A" />
      </View>
      <Text style={styles.title}>MY BARBER</Text>
      <Text style={styles.subtitle}>Ravi de vous revoir</Text>
      <Text style={styles.description}>
        Connectez-vous pour gérer vos rendez-vous et vos prestations.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#252525",
    borderWidth: 1.5,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#B8955A",
    letterSpacing: 4,
  },
  subtitle: {
    color: "#F8F7F4",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
  description: {
    color: "#999999",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
