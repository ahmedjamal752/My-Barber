import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import { Appointment } from "../../lib/mockData";

interface Props {
  limit?: number;
  showFilters?: boolean;
}

export default function AppointmentList({ limit, showFilters = true }: Props) {
  const { appointments, updateAppointmentStatus } = useAppStore();
  const [filter, setFilter] = useState<"Tous" | "Confirmé" | "En attente" | "Annulé">("Tous");

  const filtered = appointments.filter((item) => {
    if (filter === "Tous") return true;
    return item.status === filter;
  });

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  const handleAction = (item: Appointment) => {
    Alert.alert(
      `Rendez-vous : ${item.clientName}`,
      `${item.serviceName}\nDate : ${item.date} à ${item.time}\nStatut actuel : ${item.status}`,
      [
        {
          text: "Appeler le client",
          onPress: () => {
            Linking.openURL(`tel:${item.clientPhone}`).catch(() => {
              Alert.alert("Contact", `Numéro : ${item.clientPhone}`);
            });
          },
        },
        item.status !== "Confirmé"
          ? {
              text: "Marquer Confirmé",
              onPress: () => updateAppointmentStatus(item.id, "Confirmé"),
            }
          : {
              text: "Marquer Terminé",
              onPress: () => updateAppointmentStatus(item.id, "Terminé"),
            },
        item.status !== "Annulé"
          ? {
              text: "Annuler ce RDV",
              style: "destructive",
              onPress: () => updateAppointmentStatus(item.id, "Annulé"),
            }
          : { text: "Fermer", style: "cancel" },
        { text: "Fermer", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {showFilters && (
        <View style={styles.filterBar}>
          {(["Tous", "Confirmé", "En attente", "Annulé"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterChip, filter === tab && styles.activeFilterChip]}
              onPress={() => setFilter(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterChipText, filter === tab && styles.activeFilterChipText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {displayed.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={36} color="#555" />
          <Text style={styles.emptyText}>Aucun rendez-vous dans cette catégorie</Text>
        </View>
      ) : (
        displayed.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleAction(item)}
            activeOpacity={0.85}
          >
            <View style={styles.top}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#B8955A" />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{item.clientName}</Text>
                <Text style={styles.service}>{item.serviceName}</Text>
                <Text style={styles.barber}>Barbier : {item.barberName}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  item.status === "Confirmé" && styles.confirmedBadge,
                  item.status === "En attente" && styles.pendingBadge,
                  item.status === "Terminé" && styles.finishedBadge,
                  item.status === "Annulé" && styles.cancelledBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === "Confirmé" && styles.confirmedText,
                    item.status === "En attente" && styles.pendingText,
                    item.status === "Terminé" && styles.finishedText,
                    item.status === "Annulé" && styles.cancelledText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottom}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={14} color="#B8955A" />
                <Text style={styles.detailText}>{item.date}</Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={14} color="#B8955A" />
                <Text style={styles.detailText}>{item.time}</Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={14} color="#B8955A" />
                <Text style={styles.priceText}>{item.price} DH</Text>
              </View>

              <View style={styles.actionPrompt}>
                <Text style={styles.actionPromptText}>Gérer</Text>
                <Ionicons name="ellipsis-vertical" size={14} color="#D8C3A5" />
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  filterBar: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  filterChip: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeFilterChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  filterChipText: {
    color: "#D8C3A5",
    fontSize: 12,
    fontWeight: "500",
  },
  activeFilterChipText: {
    color: "#171717",
    fontWeight: "bold",
  },
  emptyContainer: {
    backgroundColor: "#222222",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyText: {
    color: "#777",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 14,
    padding: 15,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(184, 149, 90, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#F8F7F4",
    fontSize: 15,
    fontWeight: "bold",
  },
  service: {
    color: "#D8C3A5",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  barber: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#333",
  },
  confirmedBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "#B8955A",
  },
  pendingBadge: {
    backgroundColor: "rgba(229, 169, 60, 0.15)",
    borderWidth: 1,
    borderColor: "#E5A93C",
  },
  finishedBadge: {
    backgroundColor: "rgba(216, 195, 165, 0.12)",
    borderWidth: 1,
    borderColor: "#D8C3A5",
  },
  cancelledBadge: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  confirmedText: {
    color: "#B8955A",
  },
  pendingText: {
    color: "#E5A93C",
  },
  finishedText: {
    color: "#D8C3A5",
  },
  cancelledText: {
    color: "#888",
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    color: "#D8C3A5",
    fontSize: 12,
  },
  priceText: {
    color: "#F8F7F4",
    fontSize: 13,
    fontWeight: "bold",
  },
  actionPrompt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "rgba(184, 149, 90, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  actionPromptText: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "600",
  },
});
