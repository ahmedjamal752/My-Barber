import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="person-add" size={26} color="#B8955A" />
      </View>

      <Text style={styles.title}>Créer un compte</Text>

      <Text style={styles.subtitle}>
        Rejoignez My Barber et réservez votre prochain rendez-vous en quelques secondes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#252525",
    borderWidth: 1.5,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999999",
    textAlign: "center",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 15,
  },
});
