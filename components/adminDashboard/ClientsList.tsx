
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const clients = [
  {
    id: "1",
    name: "Ahmed Benali",
    phone: "+212 612345678",
    email: "ahmed@gmail.com",
    appointments: 5,
  },
  {
    id: "2",
    name: "Youssef Karim",
    phone: "+212 623456789",
    email: "youssef@gmail.com",
    appointments: 3,
  },
  {
    id: "3",
    name: "Mohamed Amine",
    phone: "+212 634567890",
    email: "mohamed@gmail.com",
    appointments: 8,
  },
  {
    id: "4",
    name: "Omar Hassan",
    phone: "+212 645678901",
    email: "omar@gmail.com",
    appointments: 2,
  },
];

export default function ClientsList() {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={20} color="#999" />

        <TextInput
          placeholder="Rechercher un client..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {clients.map((client) => (
        <View key={client.id} style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={23} color="#B8955A" />
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{client.name}</Text>
            <Text style={styles.phone}>{client.phone}</Text>
            <Text style={styles.email}>{client.email}</Text>
            <Text style={styles.history}>
              {client.appointments} rendez-vous
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#B8955A"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  search: {
    backgroundColor: "#252525",
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: "#F8F7F4",
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#252525",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#3A3023",
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
    color: "#B8955A",
    fontSize: 12,
    marginTop: 5,
  },
  email: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  history: {
    color: "#75C69A",
    fontSize: 12,
    marginTop: 7,
  },
});
