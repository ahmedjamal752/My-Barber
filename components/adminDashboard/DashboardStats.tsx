import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const stats = [
  {
    title: "Rendez-vous",
    value: "24",
    icon: "calendar-outline",
  },
  {
    title: "Clients",
    value: "156",
    icon: "people-outline",
  },
  {
    title: "Revenus",
    value: "2 450 DH",
    icon: "cash-outline",
  },
  {
    title: "Services",
    value: "8",
    icon: "cut-outline",
  },
] as const;

export default function DashboardStats() {
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.title} style={styles.card}>
          <Ionicons
            name={stat.icon}
            size={24}
            color="#B8955A"
          />

          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.title}>{stat.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    backgroundColor: "#252525",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    flexGrow: 1,
    gap: 8,
  },
  value: {
    color: "#F8F7F4",
    fontSize: 23,
    fontWeight: "bold",
  },
  title: {
    color: "#999",
    fontSize: 13,
  },
});