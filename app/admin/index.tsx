import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import DashboardHeader from "../../components/adminDashboard/DashboardHeader";
import DashboardStats from "../../components/adminDashboard/DashboardStats";
import QuickActions from "../../components/adminDashboard/QuickActions";
import AppointmentList from "../../components/adminDashboard/AppointmentList";

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <DashboardHeader />

        <Text style={styles.sectionTitle}>
          Vue d'ensemble
        </Text>

        <DashboardStats />

        <Text style={styles.sectionTitle}>
          Actions rapides
        </Text>

        <QuickActions />

        <Text style={styles.sectionTitle}>
          Rendez-vous aujourd'hui
        </Text>

        <AppointmentList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
});