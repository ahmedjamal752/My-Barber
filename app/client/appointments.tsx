import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import { SALON_INFO, Appointment } from "../../lib/mockData";
import ClientTabBar from "../../components/client/ClientTabBar";

export default function ClientAppointmentsScreen() {
  const router = useRouter();
  const { appointments, updateAppointmentStatus, currentUser } = useAppStore();
  const [filter, setFilter] = useState<"Tous" | "À venir" | "Terminé" | "Annulé">("Tous");

  // In mock mode, we show appointments or filter by user's name if matching
  const userAppointments = appointments.filter((a) => {
    if (filter === "Tous") return true;
    if (filter === "À venir") return a.status === "Confirmé" || a.status === "En attente";
    return a.status === filter;
  });

  const handleCancel = (item: Appointment) => {
    Alert.alert(
      "Annuler le rendez-vous",
      `Êtes-vous sûr de vouloir annuler votre séance "${item.serviceName}" du ${item.date} à ${item.time} ?`,
      [
        { text: "Non, conserver", style: "cancel" },
        {
          text: "Oui, annuler",
          style: "destructive",
          onPress: () => {
            updateAppointmentStatus(item.id, "Annulé");
            Alert.alert("Annulé", "Votre rendez-vous a été annulé.");
          },
        },
      ]
    );
  };

  const handleContactSalon = () => {
    Linking.openURL(`tel:${SALON_INFO.phone}`).catch(() => {
      Alert.alert("My Barber", `Téléphone : ${SALON_INFO.phone}`);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mes Rendez-vous</Text>
          <Text style={styles.subtitle}>Suivi de vos réservations</Text>
        </View>

        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => router.push("/client/book")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={18} color="#171717" />
          <Text style={styles.newBtnText}>Réserver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Filters */}
        <View style={styles.filterBar}>
          {(["Tous", "À venir", "Terminé", "Annulé"] as const).map((tab) => (
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

        {userAppointments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="calendar-outline" size={36} color="#B8955A" />
            </View>
            <Text style={styles.emptyTitle}>Aucun rendez-vous</Text>
            <Text style={styles.emptySubtitle}>
              Vous n'avez pas de rendez-vous dans cette catégorie.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => router.push("/client/book")}
              activeOpacity={0.85}
            >
              <Text style={styles.emptyBtnText}>Prendre un rendez-vous</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.list}>
            {userAppointments.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.serviceName}>{item.serviceName}</Text>
                    <Text style={styles.barberName}>Barbier : {item.barberName}</Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
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

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.priceLabel}>Montant</Text>
                    <Text style={styles.priceValue}>{item.price} DH</Text>
                  </View>

                  <View style={styles.footerActions}>
                    <TouchableOpacity
                      style={styles.contactBtn}
                      onPress={handleContactSalon}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="call-outline" size={14} color="#D8C3A5" />
                      <Text style={styles.contactBtnText}>Salon</Text>
                    </TouchableOpacity>

                    {item.status !== "Annulé" && item.status !== "Terminé" && (
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => handleCancel(item)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.cancelBtnText}>Annuler</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <ClientTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },
  title: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  newBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  filterBar: {
    flexDirection: "row",
    gap: 8,
  },
  filterChip: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  activeFilterChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  filterChipText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  activeFilterChipText: {
    color: "#171717",
    fontWeight: "bold",
  },
  emptyContainer: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginTop: 30,
    gap: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptySubtitle: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
  },
  emptyBtn: {
    backgroundColor: "#B8955A",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  emptyBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 14,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  dateText: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "bold",
  },
  timeText: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 2,
  },
  serviceName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
  },
  barberName: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
  },
  confirmedBadge: {
    backgroundColor: "rgba(117, 198, 154, 0.15)",
    borderWidth: 1,
    borderColor: "#75C69A",
  },
  pendingBadge: {
    backgroundColor: "rgba(229, 169, 60, 0.15)",
    borderWidth: 1,
    borderColor: "#E5A93C",
  },
  finishedBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "#B8955A",
  },
  cancelledBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  confirmedText: { color: "#75C69A" },
  pendingText: { color: "#E5A93C" },
  finishedText: { color: "#D8C3A5" },
  cancelledText: { color: "#EF4444" },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    color: "#888",
    fontSize: 11,
  },
  priceValue: {
    color: "#B8955A",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  contactBtnText: {
    color: "#D8C3A5",
    fontSize: 12,
  },
  cancelBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },
});
