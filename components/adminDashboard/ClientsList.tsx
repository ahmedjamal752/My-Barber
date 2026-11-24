import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "../../lib/store";
import { Client } from "../../lib/mockData";

export default function ClientsList() {
  const router = useRouter();
  const { clients } = useAppStore();
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleClientAction = (client: Client) => {
    Alert.alert(
      client.name,
      `Téléphone : ${client.phone}\nEmail : ${client.email}\nRendez-vous : ${client.appointmentsCount}\nDernière visite : ${client.lastVisit}\n${client.notes ? `Note : ${client.notes}` : ""}`,
      [
        {
          text: "Appeler",
          onPress: () => {
            Linking.openURL(`tel:${client.phone}`).catch(() => {
              Alert.alert("Contact", `Numéro : ${client.phone}`);
            });
          },
        },
        {
          text: "Prendre un RDV pour lui",
          onPress: () => router.push("/admin/add-appointment"),
        },
        { text: "Fermer", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color="#B8955A" />
          <TextInput
            placeholder="Rechercher par nom, tél ou email..."
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={16} color="#777" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/admin/client")}
          activeOpacity={0.8}
        >
          <Ionicons name="person-add" size={18} color="#171717" />
        </TouchableOpacity>
      </View>

      <Text style={styles.counterText}>
        {filtered.length} client{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
      </Text>

      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="person-outline" size={36} color="#555" />
          <Text style={styles.emptyText}>Aucun client trouvé pour "{search}"</Text>
        </View>
      ) : (
        filtered.map((client) => (
          <TouchableOpacity
            key={client.id}
            style={styles.card}
            onPress={() => handleClientAction(client)}
            activeOpacity={0.8}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color="#B8955A" />
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{client.name}</Text>
              <Text style={styles.phone}>{client.phone}</Text>
              <Text style={styles.email}>{client.email}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.history}>
                  {client.appointmentsCount} rendez-vous
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.lastVisit}>{client.lastVisit}</Text>
              </View>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#B8955A" />
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  search: {
    flex: 1,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: "#F8F7F4",
    paddingVertical: 12,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#B8955A",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    color: "#888",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
  },
  emptyContainer: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    color: "#777",
    fontSize: 13,
  },
  card: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
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
  phone: {
    color: "#D8C3A5",
    fontSize: 12,
    marginTop: 2,
  },
  email: {
    color: "#888",
    fontSize: 11,
    marginTop: 1,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  history: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "600",
  },
  dot: {
    color: "#555",
    fontSize: 10,
  },
  lastVisit: {
    color: "#999",
    fontSize: 11,
  },
});
