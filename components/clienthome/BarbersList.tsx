import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const barbers = [
  { id: "1", name: "[Coiffeur 1]" },
  { id: "2", name: "[Coiffeur 2]" },
  { id: "3", name: "[Coiffeur 3]" },
];

export default function BarbersList() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Nos coiffeurs</Text>

      <View style={styles.row}>
        {barbers.map((barber) => (
          <TouchableOpacity
            key={barber.id}
            style={styles.card}
            onPress={() => console.log("Coiffeur", barber.id)}
          >
            <View style={styles.avatar} />
            <Text style={styles.name}>{barber.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#D8C3A5",
  },
  name: {
    color: "#D8C3A5",
    fontSize: 14,
    textAlign: "center",
  },
});