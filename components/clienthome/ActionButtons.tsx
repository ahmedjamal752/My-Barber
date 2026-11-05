import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ActionButtons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.primary}
        onPress={() => console.log("Réserver maintenant")}
      >
        <Text style={styles.primaryText}>Réserver maintenant</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondary}
        onPress={() => console.log("Itinéraire")}
      >
        <Text style={styles.secondaryText}>Itinéraire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  primary: {
    flex: 1,
    backgroundColor: "#B8955A",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondary: {
    borderWidth: 1,
    borderColor: "#B8955A",
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: "center",
  },
  secondaryText: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
  },
});