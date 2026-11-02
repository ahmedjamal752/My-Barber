import { View, Text, StyleSheet } from "react-native";

const appointments = [
  {
    name: "Ahmed Benali",
    service: "Coupe classique",
    time: "10:00",
    status: "Confirmé",
  },
  {
    name: "Youssef Karim",
    service: "Barbe + Coupe",
    time: "11:30",
    status: "En attente",
  },
  {
    name: "Mohamed Amine",
    service: "Dégradé",
    time: "14:00",
    status: "Confirmé",
  },
];

export default function AppointmentList() {
  return (
    <View style={styles.container}>
      {appointments.map((appointment) => (
        <View key={appointment.name} style={styles.card}>
          <View style={styles.time}>
            <Text style={styles.timeText}>{appointment.time}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{appointment.name}</Text>
            <Text style={styles.service}>{appointment.service}</Text>
          </View>

          <Text
            style={[
              styles.status,
              appointment.status === "Confirmé"
                ? styles.confirmed
                : styles.pending,
            ]}
          >
            {appointment.status}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 14,
    borderRadius: 10,
    gap: 12,
  },
  time: {
    backgroundColor: "#3A3023",
    padding: 10,
    borderRadius: 8,
  },
  timeText: {
    color: "#B8955A",
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#F8F7F4",
    fontWeight: "bold",
    fontSize: 14,
  },
  service: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  status: {
    fontSize: 11,
    fontWeight: "bold",
  },
  confirmed: {
    color: "#75C69A",
  },
  pending: {
    color: "#E5B85C",
  },
});