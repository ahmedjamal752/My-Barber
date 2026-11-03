
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const actions = [
  {
    title: "Ajouter un rendez-vous",
    icon: "calendar-outline" as const,
    route: "/admin/appointment" as const,
  },
  {
    title: "Ajouter un service",
    icon: "cut-outline" as const,
    route: "/admin/service" as const,
  },
  {
    title: "Ajouter un client",
    icon: "person-add-outline" as const,
    route: "/admin/client" as const,
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.title}
          style={styles.action}
          onPress={() => router.push(action.route)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={action.icon}
            size={22}
            color="#B8955A"
          />

          <Text style={styles.text}>
            {action.title}
          </Text>

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
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: "#F8F7F4",
    flex: 1,
    fontSize: 15,
  },
});
