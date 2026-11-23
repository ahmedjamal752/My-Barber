import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const actions = [
  {
    title: "Créer un nouveau rendez-vous",
    subtitle: "Sélection client, coiffeur, créneau",
    icon: "calendar" as const,
    route: "/admin/add-appointment" as const,
    highlight: true,
  },
  {
    title: "Ajouter un client",
    subtitle: "Enregistrer un nouveau client au salon",
    icon: "person-add-outline" as const,
    route: "/admin/client" as const,
  },
  {
    title: "Ajouter une prestation / service",
    subtitle: "Nouvelle coupe, barbe ou soin",
    icon: "cut-outline" as const,
    route: "/admin/service" as const,
  },
  {
    title: "Gérer le catalogue des services",
    subtitle: "Tarifs, durées et modifications",
    icon: "list-outline" as const,
    route: "/admin/services" as const,
  },
  {
    title: "Basculer vers l'espace Client",
    subtitle: "Tester l'expérience client et réservation",
    icon: "phone-portrait-outline" as const,
    route: "/client" as const,
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.title}
          style={[styles.action, action.highlight && styles.highlightAction]}
          onPress={() => router.push(action.route)}
          activeOpacity={0.75}
        >
          <View style={[styles.iconCircle, action.highlight && styles.highlightIconCircle]}>
            <Ionicons
              name={action.icon}
              size={20}
              color={action.highlight ? "#171717" : "#B8955A"}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, action.highlight && styles.highlightTitle]}>
              {action.title}
            </Text>
            <Text style={styles.subtitle}>{action.subtitle}</Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={action.highlight ? "#B8955A" : "#666"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  action: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333333",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  highlightAction: {
    borderColor: "#B8955A",
    backgroundColor: "rgba(184, 149, 90, 0.08)",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  highlightIconCircle: {
    backgroundColor: "#B8955A",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "600",
  },
  highlightTitle: {
    color: "#F8F7F4",
    fontWeight: "700",
  },
  subtitle: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
});
