import { View, Text, StyleSheet } from "react-native";

export default function RegisterHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>＋</Text>
      </View>

      <Text style={styles.title}>Créer un compte</Text>

      <Text style={styles.subtitle}>
        Rejoignez My Barber et réservez votre prochain rendez-vous.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconText: {
    color: "#B8955A",
    fontSize: 32,
    fontWeight: "bold",
  },
  title: {
    color: "#F8F7F4",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
  },
});