
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const appointments = [
  {
    id: "1",
    name: "Ahmed Benali",
    service: "Coupe classique",
    date: "03/11/2026",
    time: "10:00",
    status: "Confirmé",
  },
  {
    id: "2",
    name: "Youssef Karim",
    service: "Barbe + Coupe",
    date: "03/11/2026",
    time: "11:30",
    status: "En attente",
  },
  {
    id: "3",
    name: "Mohamed Amine",
    service: "Dégradé",
    date: "04/11/2026",
    time: "14:00",
    status: "Confirmé",
  },
  {
    id: "4",
    name: "Omar Hassan",
    service: "Taille de barbe",
    date: "04/11/2026",
    time: "16:00",
    status: "Annulé",
  },
];

export default function AppointmentsList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {appointments.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.top}>
              <View style={styles.avatar}>
                <Ionicons
                  name="person"
                  size={22}
                  color="#B8955A"
                />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.service}>{item.service}</Text>
              </View>

              <View style={[
                styles.badge,
                item.status === "Confirmé" && styles.confirmed,
                item.status === "En attente" && styles.pending,
                item.status === "Annulé" && styles.cancelled,
              ]}>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottom}>
              <Text style={styles.detail}>
                <Ionicons name="calendar-outline" size={14} />
                {" "}{item.date}
              </Text>

              <Text style={styles.detail}>
                <Ionicons name="time-outline" size={14} />
                {" "}{item.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  card: {
    backgroundColor: "#252525",
    borderRadius: 14,
    padding: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 45,
    height: 45,
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
  service: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#333",
  },
  confirmed: {
    backgroundColor: "#193A2B",
  },
  pending: {
    backgroundColor: "#40351D",
  },
  cancelled: {
    backgroundColor: "#432323",
  },
  status: {
    color: "#F8F7F4",
    fontSize: 10,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 14,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    color: "#B8955A",
    fontSize: 12,
  },
});
