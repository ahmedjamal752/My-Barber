import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import ClientTabBar from "../../components/client/ClientTabBar";

export default function ClientHomeScreen() {
  const router = useRouter();
  const { currentUser, services, barbers, appointments } = useAppStore();

  const nextAppointment = appointments.find((a) => a.status === "Confirmé");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.name}>{currentUser?.name || "Ahmed Jamaleddine"}</Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.pointsPill}>
            <Ionicons name="star" size={12} color="#171717" />
            <Text style={styles.pointsText}>140 pts</Text>
          </View>

          <TouchableOpacity
            style={styles.adminSwitchBtn}
            onPress={() => router.push("/admin")}
            activeOpacity={0.8}
          >
            <Ionicons name="shield-checkmark-outline" size={18} color="#B8955A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Promo Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>OFFRE SPÉCIALE DU MOIS</Text>
          </View>
          <Text style={styles.heroTitle}>Pack VIP : Coupe + Barbe</Text>
          <Text style={styles.heroSub}>
            Serviette chaude & soin visage purifiant inclus pour un rituel d'exception.
          </Text>
          <View style={styles.heroFooter}>
            <View>
              <Text style={styles.heroPrice}>160 DH</Text>
              <Text style={styles.heroOldPrice}>190 DH</Text>
            </View>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => router.push("/client/book")}
              activeOpacity={0.85}
            >
              <Text style={styles.heroBtnText}>Prendre RDV</Text>
              <Ionicons name="arrow-forward" size={16} color="#171717" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Prochain Rendez-vous if exists */}
        {nextAppointment && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Votre prochain rendez-vous</Text>
              <TouchableOpacity onPress={() => router.push("/client/appointments")}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.nextAptCard}
              onPress={() => router.push("/client/appointments")}
              activeOpacity={0.85}
            >
              <View style={styles.nextAptTop}>
                <View style={styles.nextAptDateBadge}>
                  <Text style={styles.nextAptDateDay}>{nextAppointment.date}</Text>
                  <Text style={styles.nextAptDateTime}>{nextAppointment.time}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.nextAptService}>{nextAppointment.serviceName}</Text>
                  <Text style={styles.nextAptBarber}>Avec {nextAppointment.barberName}</Text>
                </View>

                <View style={styles.confirmedPill}>
                  <Text style={styles.confirmedPillText}>Confirmé</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Services Populaires */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prestations Populaires</Text>
            <TouchableOpacity onPress={() => router.push("/client/services")}>
              <Text style={styles.seeAllText}>Catalogue</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            {services.slice(0, 5).map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.serviceCard}
                onPress={() => router.push("/client/book")}
                activeOpacity={0.85}
              >
                <View style={styles.serviceIcon}>
                  <Ionicons name="cut" size={20} color="#B8955A" />
                </View>
                <Text style={styles.serviceName} numberOfLines={2}>
                  {s.name}
                </Text>
                <Text style={styles.serviceDuration}>{s.duration} min</Text>
                <View style={styles.serviceBottom}>
                  <Text style={styles.servicePrice}>{s.price} DH</Text>
                  <View style={styles.bookIconPill}>
                    <Ionicons name="add" size={16} color="#171717" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nos Barbiers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nos Barbiers Experts</Text>
          </View>

          <View style={styles.barbersList}>
            {barbers.map((b) => (
              <View key={b.id} style={styles.barberCard}>
                <View style={styles.barberAvatar}>
                  <Ionicons name="person" size={22} color="#B8955A" />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.barberNameRow}>
                    <Text style={styles.barberName}>{b.name}</Text>
                    <View style={styles.barberRating}>
                      <Ionicons name="star" size={12} color="#B8955A" />
                      <Text style={styles.ratingText}>{b.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.barberRole}>{b.role}</Text>
                  <Text style={styles.barberSpecialty}>{b.specialty}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Salon Perks / Valeurs */}
        <View style={styles.perksContainer}>
          <View style={styles.perkItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#B8955A" />
            <Text style={styles.perkTitle}>Hygiène & Soins</Text>
            <Text style={styles.perkDesc}>Instruments stérilisés et produits bio</Text>
          </View>

          <View style={styles.perkItem}>
            <Ionicons name="time-outline" size={20} color="#B8955A" />
            <Text style={styles.perkTitle}>Ponctualité</Text>
            <Text style={styles.perkDesc}>Réservation respectée à la minute</Text>
          </View>

          <View style={styles.perkItem}>
            <Ionicons name="sparkles-outline" size={20} color="#B8955A" />
            <Text style={styles.perkTitle}>Ambiance Lounge</Text>
            <Text style={styles.perkDesc}>Café offert & détente totale</Text>
          </View>
        </View>
      </ScrollView>

      {/* Tab Bar */}
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
  greeting: {
    color: "#888",
    fontSize: 13,
  },
  name: {
    color: "#F8F7F4",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pointsPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#B8955A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  adminSwitchBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
    gap: 24,
  },
  heroBanner: {
    backgroundColor: "#222222",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#B8955A",
    padding: 18,
    position: "relative",
  },
  heroTag: {
    backgroundColor: "rgba(184, 149, 90, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  heroTagText: {
    color: "#B8955A",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.8,
  },
  heroTitle: {
    color: "#F8F7F4",
    fontSize: 20,
    fontWeight: "bold",
  },
  heroSub: {
    color: "#999999",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 16,
  },
  heroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroPrice: {
    color: "#B8955A",
    fontSize: 22,
    fontWeight: "bold",
  },
  heroOldPrice: {
    color: "#666",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  heroBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  heroBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 13,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#F8F7F4",
    fontSize: 17,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#B8955A",
    fontSize: 13,
    fontWeight: "600",
  },
  nextAptCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
  },
  nextAptTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  nextAptDateBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  nextAptDateDay: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "bold",
  },
  nextAptDateTime: {
    color: "#F8F7F4",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
  },
  nextAptService: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
  },
  nextAptBarber: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  confirmedPill: {
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "#B8955A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confirmedPillText: {
    color: "#B8955A",
    fontSize: 10,
    fontWeight: "bold",
  },
  servicesScroll: {
    flexDirection: "row",
  },
  serviceCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
    width: 155,
    marginRight: 12,
    justifyContent: "space-between",
  },
  serviceIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  serviceName: {
    color: "#F8F7F4",
    fontSize: 13,
    fontWeight: "600",
    minHeight: 34,
  },
  serviceDuration: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
  },
  serviceBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  servicePrice: {
    color: "#B8955A",
    fontSize: 15,
    fontWeight: "bold",
  },
  bookIconPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
  },
  barbersList: {
    gap: 10,
  },
  barberCard: {
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(184, 149, 90, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(184, 149, 90, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  barberNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barberName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
  },
  barberRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "bold",
  },
  barberRole: {
    color: "#B8955A",
    fontSize: 11,
    marginTop: 2,
  },
  barberSpecialty: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
  perksContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
    justifyContent: "space-between",
  },
  perkItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 4,
  },
  perkTitle: {
    color: "#F8F7F4",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
  },
  perkDesc: {
    color: "#777",
    fontSize: 9,
    textAlign: "center",
    lineHeight: 12,
  },
});
