import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppointmentList from "../../components/adminDashboard/AppointmentList";
import { useAppStore } from "../../lib/store";

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments } = useAppStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#B8955A" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Rendez-vous</Text>
          <Text style={styles.subtitle}>Planning & réservations</Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => router.push("/admin/add-appointment")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#171717" />
          <Text style={styles.newButtonText}>Nouveau</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryTitle}>Total Réservations</Text>
            <Text style={styles.countText}>{appointments.length} rendez-vous</Text>
          </View>
          <View style={styles.summaryPill}>
            <Text style={styles.summaryPillText}>
              {appointments.filter((a) => a.status === "Confirmé").length} confirmés
            </Text>
          </View>
        </View>

        <AppointmentList showFilters={true} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  backButton: {
    padding: 6,
  },
  headerText: {
    flex: 1,
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
  newButton: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newButtonText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    color: "#888",
    fontSize: 12,
  },
  countText: {
    color: "#B8955A",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 3,
  },
  summaryPill: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "#B8955A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  summaryPillText: {
    color: "#B8955A",
    fontSize: 12,
    fontWeight: "600",
  },
});
