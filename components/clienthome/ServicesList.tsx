import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const services = [
  { id: "coupe", name: "Coupe homme", duration: 30, price: 60 },
  { id: "degrade", name: "Dégradé", duration: 40, price: 80 },
  { id: "barbe", name: "Barbe", duration: 20, price: 40 },
];

export default function ServicesList() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Nos services</Text>

      <View style={styles.row}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() => console.log("Service", service.id)}
          >
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.meta}>
              {service.duration} min · {service.price} MAD
            </Text>
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
    padding: 16,
  },
  name: {
    color: "#F8F7F4",
    fontSize: 16,
  },
  meta: {
    color: "#D8C3A5",
    fontSize: 14,
    marginTop: 4,
  },
});