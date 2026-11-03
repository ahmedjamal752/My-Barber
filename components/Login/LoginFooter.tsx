import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginFooter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.link}>Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        © 2026 My Barber. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  link: {
    color: "#B8955A",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 25,
  },
  footerText: {
    color: "#777",
    fontSize: 12,
  },
});