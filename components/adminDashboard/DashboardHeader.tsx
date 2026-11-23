import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "../../lib/store";

export default function DashboardHeader() {
  const router = useRouter();
  const { currentUser, logout } = useAppStore();

  const handleProfilePress = () => {
    Alert.alert(
      currentUser?.name || "Espace Administrateur",
      "Que souhaitez-vous faire ?",
      [
        {
          text: "Passer à l'espace Client",
          onPress: () => router.push("/client"),
        },
        {
          text: "Paramètres du salon",
          onPress: () => router.push("/admin/settings"),
        },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/");
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Bonjour,</Text>
        <Text style={styles.title}>{currentUser?.name || "Karim Amrani"}</Text>
        <Text style={styles.roleBadge}>Administrateur / Master Barber</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/admin/settings")}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={20} color="#D8C3A5" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={handleProfilePress}
          activeOpacity={0.8}
        >
          <Ionicons name="person" size={20} color="#B8955A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  greeting: {
    color: "#888",
    fontSize: 13,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 2,
  },
  roleBadge: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "#252525",
    borderWidth: 1.5,
    borderColor: "#B8955A",
    borderRadius: 24,
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
});
