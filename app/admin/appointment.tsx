import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import AppointmentsList from "../../components/adminDashboard/AppointmentList";

export default function AppointmentsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#B8955A" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Rendez-vous</Text>
          <Text style={styles.subtitle}>Gestion des réservations</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.count}>
          <Text style={styles.countText}>4 rendez-vous au total</Text>
        </View>

        <AppointmentsList />
      </View>
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
    gap: 20,
    padding: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999",
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  count: {
    backgroundColor: "#252525",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  countText: {
    color: "#B8955A",
    fontWeight: "bold",
  },
});