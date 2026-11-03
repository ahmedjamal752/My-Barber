import { View, Text, StyleSheet } from "react-native";

export default function LoginLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY BARBER</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.description}>
        Sign in to manage your barber appointments.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 35,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#B8955A",
    letterSpacing: 3,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 15,
  },
  description: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});