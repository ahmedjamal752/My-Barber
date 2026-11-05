import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const tabs = [
  { id: "home", label: "Accueil" },
  { id: "services", label: "Services" },
  { id: "book", label: "Réserver" },
  { id: "appointments", label: "Mes RDV" },
  { id: "profile", label: "Profil" },
];

type Props = {
  active?: string;
};

export default function ClientTabBar({ active = "home" }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => console.log("Onglet", tab.id)}
        >
          <Text style={[styles.label, tab.id === active && styles.active]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#252525",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  tab: {
    paddingHorizontal: 2,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 13,
  },
  active: {
    color: "#B8955A",
  },
});