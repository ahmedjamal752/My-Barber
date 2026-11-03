import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Route } from "expo-router/build/Route";
import { router } from "expo-router";

export default function DashboardHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Bienvenue, Admin</Text>
        <Text style={styles.title}>Dashboard</Text>
      </View>

      <View style={styles.avatar}>
        <Ionicons name="person" size={24} color="#B8955A" onPress={ () => { router.push("./profile") } } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greeting: {
    color: "#999",
    fontSize: 14,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  avatar: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#B8955A",
    borderRadius: 50,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});