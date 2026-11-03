import { Text, StyleSheet } from "react-native";

export default function WelcomeFooter() {
  return (
    <Text style={styles.footer}>
      L'expérience barber shop, autrement.
    </Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    color: "#777",
    fontSize: 12,
    textAlign: "center",
    marginTop: 25,
  },
});