import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import { SALON_INFO } from "../../lib/mockData";

export default function AdminSettingsScreen() {
  const router = useRouter();
  const { currentUser, logout, barbers } = useAppStore();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#B8955A" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Paramètres & Salon</Text>
          <Text style={styles.subtitle}>Gestion de l'établissement</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Salon Info Card */}
        <View style={styles.salonCard}>
          <View style={styles.salonIcon}>
            <Ionicons name="cut" size={28} color="#B8955A" />
          </View>
          <Text style={styles.salonName}>{SALON_INFO.name}</Text>
          <Text style={styles.salonTagline}>{SALON_INFO.tagline}</Text>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#B8955A" />
            <Text style={styles.infoText}>{SALON_INFO.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#B8955A" />
            <Text style={styles.infoText}>{SALON_INFO.openingHours}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color="#B8955A" />
            <Text style={styles.infoText}>{SALON_INFO.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="logo-instagram" size={16} color="#B8955A" />
            <Text style={styles.infoText}>{SALON_INFO.instagram}</Text>
          </View>
        </View>

        {/* Team Members */}
        <Text style={styles.sectionTitle}>Équipe de Barbiers ({barbers.length})</Text>
        <View style={styles.teamList}>
          {barbers.map((b) => (
            <View key={b.id} style={styles.barberRow}>
              <View style={styles.barberAvatar}>
                <Ionicons name="person" size={20} color="#B8955A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.barberName}>{b.name}</Text>
                <Text style={styles.barberSpecialty}>{b.specialty}</Text>
                <Text style={styles.barberExp}>{b.experience}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#B8955A" />
                <Text style={styles.ratingText}>{b.rating}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Navigation & Mode Shortcuts */}
        <Text style={styles.sectionTitle}>Accès rapides & Navigation</Text>
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/client")}
            activeOpacity={0.7}
          >
            <Ionicons name="eye-outline" size={20} color="#B8955A" />
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemTitle}>Aperçu de l'espace Client</Text>
              <Text style={styles.menuItemSub}>Voir ce que voient vos clients</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/admin/appointment")}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={20} color="#B8955A" />
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemTitle}>Planning complet</Text>
              <Text style={styles.menuItemSub}>Calendrier des rendez-vous</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/admin/clients")}
            activeOpacity={0.7}
          >
            <Ionicons name="people-outline" size={20} color="#B8955A" />
            <View style={{ flex: 1 }}>
              <Text style={styles.menuItemTitle}>Fichier Clients</Text>
              <Text style={styles.menuItemSub}>Contacts & historique</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
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
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  backButton: {
    padding: 6,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  salonCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  salonIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  salonName: {
    color: "#B8955A",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  salonTagline: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  infoText: {
    color: "#D8C3A5",
    fontSize: 13,
  },
  sectionTitle: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 12,
  },
  teamList: {
    gap: 10,
  },
  barberRow: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  barberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  barberName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
  },
  barberSpecialty: {
    color: "#B8955A",
    fontSize: 11,
    marginTop: 2,
  },
  barberExp: {
    color: "#888",
    fontSize: 10,
    marginTop: 1,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "bold",
  },
  menuList: {
    backgroundColor: "#252525",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2F2F2F",
  },
  menuItemTitle: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "600",
  },
  menuItemSub: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "bold",
  },
});
