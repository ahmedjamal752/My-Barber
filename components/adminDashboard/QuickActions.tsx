import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const actions = [
  {
    title: "Ajouter un rendez-vous",
    icon: "calendar-outline",
  },
  {
    title: "Ajouter un service",
    icon: "cut-outline",
  },
  {
    title: "Ajouter un client",
    icon: "person-add-outline",
  },
] as const;

export default function QuickActions() {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.title}
          style={styles.action}
          onPress={() => console.log(action.title)}
        >
          <Ionicons
            name={action.icon}
            size={22}
            color="#B8955A"
          />

          <Text style={styles.text}>{action.title}</Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#777"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  action: {
    backgroundColor: "#252525",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: "#F8F7F4",
    flex: 1,
    fontSize: 14,
  },
});