import { View, Text, StyleSheet } from "react-native";

export default function WelcomeLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MY BARBER</Text>
      <Text style={styles.subtitle}>Your style, our expertise</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    color: "#B8955A",
    fontSize: 38,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  subtitle: {
    color: "#D8C3A5",
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 1,
  },
});