import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "../../lib/store";

export default function DashboardStats() {
  const router = useRouter();
  const { appointments, clients, services } = useAppStore();

  const totalRevenue = appointments
    .filter((a) => a.status !== "Annulé")
    .reduce((sum, a) => sum + a.price, 0);

  const stats = [
    {
      title: "Rendez-vous",
      value: `${appointments.length}`,
      icon: "calendar-outline" as const,
      route: "/admin/appointment" as const,
      subtitle: `${appointments.filter((a) => a.status === "Confirmé").length} confirmés`,
    },
    {
      title: "Clients actifs",
      value: `${clients.length}`,
      icon: "people-outline" as const,
      route: "/admin/clients" as const,
      subtitle: "Fidélité & Base",
    },
    {
      title: "Chiffre d'Affaires",
      value: `${totalRevenue} DH`,
      icon: "cash-outline" as const,
      route: "/admin/appointment" as const,
      subtitle: "Estimé / Réalisé",
    },
    {
      title: "Services au menu",
      value: `${services.length}`,
      icon: "cut-outline" as const,
      route: "/admin/services" as const,
      subtitle: "Prestations",
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <TouchableOpacity
          key={stat.title}
          style={styles.card}
          onPress={() => router.push(stat.route)}
          activeOpacity={0.75}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name={stat.icon} size={20} color="#B8955A" />
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={18} color="#666" />
          </View>

          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.title}>{stat.title}</Text>
          <Text style={styles.subtitle}>{stat.subtitle}</Text>
        </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 14,
    padding: 14,
    width: "48%",
    flexGrow: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
  },
  subtitle: {
    color: "#777",
    fontSize: 11,
    marginTop: 2,
  },
});
