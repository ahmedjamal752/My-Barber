import { Text, StyleSheet } from "react-native";

export default function WelcomeFooter() {
  return (
    <Text style={styles.footer}>
      L'expérience barber shop, réinventée.
    </Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginTop: 15,
    letterSpacing: 0.5,
  },
});
