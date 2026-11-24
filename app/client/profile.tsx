import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import { SALON_INFO } from "../../lib/mockData";
import ClientTabBar from "../../components/client/ClientTabBar";

export default function ClientProfileScreen() {
  const router = useRouter();
  const { currentUser, logout } = useAppStore();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter de votre compte ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/");
        },
      },
    ]);
  };

  const handleCallSalon = () => {
    Linking.openURL(`tel:${SALON_INFO.phone}`).catch(() => {
      Alert.alert("Salon My Barber", `Tél : ${SALON_INFO.phone}`);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mon Profil</Text>
        <TouchableOpacity
          style={styles.adminSwitch}
          onPress={() => router.push("/admin")}
          activeOpacity={0.8}
        >
          <Ionicons name="shield-checkmark" size={14} color="#171717" />
          <Text style={styles.adminSwitchText}>Mode Admin</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#B8955A" />
          </View>

          <Text style={styles.userName}>{currentUser?.name || "Ahmed Jamaleddine"}</Text>
          <Text style={styles.userEmail}>{currentUser?.email || "ahmed@barber.com"}</Text>
          <Text style={styles.userPhone}>{currentUser?.phone || "+212 612 345 678"}</Text>

          <View style={styles.statusPill}>
            <Ionicons name="sparkles" size={12} color="#171717" />
            <Text style={styles.statusPillText}>MEMBRE CLUB VIP</Text>
          </View>
        </View>

        {/* Loyalty Program Card */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <View>
              <Text style={styles.loyaltyTitle}>Programme Fidélité</Text>
              <Text style={styles.loyaltySub}>10 visites = 1 prestation offerte</Text>
            </View>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsNumber}>140</Text>
              <Text style={styles.pointsLabel}>Points</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "70%" }]} />
            </View>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressText}>7 rendez-vous complétés</Text>
              <Text style={styles.progressTextGold}>Plus que 3 pour votre cadeau !</Text>
            </View>
          </View>
        </View>

        {/* Coiffure Preferences */}
        <Text style={styles.sectionTitle}>Préférences de Style</Text>
        <View style={styles.prefCard}>
          <View style={styles.prefRow}>
            <Ionicons name="cut-outline" size={18} color="#B8955A" />
            <View style={{ flex: 1 }}>
              <Text style={styles.prefLabel}>Coupe Favorite</Text>
              <Text style={styles.prefValue}>Dégradé Américain (Mid Fade)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.prefRow}>
            <Ionicons name="person-outline" size={18} color="#B8955A" />
            <View style={{ flex: 1 }}>
              <Text style={styles.prefLabel}>Barbier Préféré</Text>
              <Text style={styles.prefValue}>Karim 'The Razor' Amrani</Text>
            </View>
          </View>
        </View>

        {/* Salon Details */}
        <Text style={styles.sectionTitle}>Notre Établissement</Text>
        <View style={styles.salonCard}>
          <Text style={styles.salonName}>{SALON_INFO.name}</Text>
          <Text style={styles.salonTagline}>{SALON_INFO.tagline}</Text>

          <View style={styles.salonInfoItem}>
            <Ionicons name="location-outline" size={16} color="#B8955A" />
            <Text style={styles.salonInfoText}>{SALON_INFO.address}</Text>
          </View>

          <View style={styles.salonInfoItem}>
            <Ionicons name="time-outline" size={16} color="#B8955A" />
            <Text style={styles.salonInfoText}>{SALON_INFO.openingHours}</Text>
          </View>

          <TouchableOpacity
            style={styles.callSalonBtn}
            onPress={handleCallSalon}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={16} color="#171717" />
            <Text style={styles.callSalonText}>Appeler le salon ({SALON_INFO.phone})</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color="#B8955A" />
          <Text style={styles.logoutBtnText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>

      <ClientTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },
  title: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
  },
  adminSwitch: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  adminSwitchText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 11,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  profileCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 2,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  userName: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  userPhone: {
    color: "#D8C3A5",
    fontSize: 13,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#B8955A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 14,
  },
  statusPillText: {
    color: "#171717",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  loyaltyCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#B8955A",
    padding: 16,
    gap: 12,
  },
  loyaltyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loyaltyTitle: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
  },
  loyaltySub: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  pointsBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  pointsNumber: {
    color: "#B8955A",
    fontSize: 16,
    fontWeight: "bold",
  },
  pointsLabel: {
    color: "#D8C3A5",
    fontSize: 9,
  },
  progressContainer: {
    gap: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#B8955A",
    borderRadius: 4,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    color: "#888",
    fontSize: 11,
  },
  progressTextGold: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  prefCard: {
    backgroundColor: "#252525",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
    gap: 10,
  },
  prefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  prefLabel: {
    color: "#888",
    fontSize: 11,
  },
  prefValue: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
  },
  salonCard: {
    backgroundColor: "#252525",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    padding: 16,
    gap: 8,
  },
  salonName: {
    color: "#B8955A",
    fontSize: 16,
    fontWeight: "bold",
  },
  salonTagline: {
    color: "#888",
    fontSize: 12,
    marginBottom: 6,
  },
  salonInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salonInfoText: {
    color: "#D8C3A5",
    fontSize: 13,
  },
  callSalonBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  callSalonText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 13,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(184, 149, 90, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(184, 149, 90, 0.3)",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  logoutBtnText: {
    color: "#B8955A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
