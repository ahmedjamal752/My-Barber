import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import ClientsList from "../../components/adminDashboard/ClientsList";

export default function ClientsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#B8955A" />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Clients</Text>
          <Text style={styles.subtitle}>Gestion des clients</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ClientsList />
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
});