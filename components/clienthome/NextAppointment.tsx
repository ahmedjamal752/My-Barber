import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  when?: string;
  service?: string;
  status?: string;
};

export default function NextAppointment({
  when = "Sam. 14:30",
  service = "Dégradé + barbe",
  status = "Confirmé",
}: Props) {
  const confirmed = status === "Confirmé";

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Prochain rendez-vous</Text>
      <Text style={styles.title}>
        {when} · {service}
      </Text>

      <View style={styles.badge}>
        <View
          style={[
            styles.dot,
            { backgroundColor: confirmed ? "#75C69A" : "#E5B85C" },
          ]}
        />
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#B8955A",
    borderRadius: 20,
    padding: 18,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 14,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  badgeText: {
    color: "#F8F7F4",
    fontSize: 13,
  },
});
