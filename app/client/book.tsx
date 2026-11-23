import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import ClientTabBar from "../../components/client/ClientTabBar";

const TIME_SLOTS = [
  "09:30",
  "10:15",
  "11:00",
  "11:45",
  "14:00",
  "14:45",
  "15:30",
  "16:15",
  "17:00",
  "18:00",
  "19:00",
];

const DATE_OPTIONS = [
  { label: "Aujourd'hui", day: "23 Nov" },
  { label: "Demain", day: "24 Nov" },
  { label: "Mercredi", day: "25 Nov" },
  { label: "Jeudi", day: "26 Nov" },
  { label: "Vendredi", day: "27 Nov" },
  { label: "Samedi", day: "28 Nov" },
];

export default function ClientBookScreen() {
  const router = useRouter();
  const { services, barbers, currentUser, addAppointment } = useAppStore();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || "");
  const [selectedBarberId, setSelectedBarberId] = useState<string>(barbers[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>("Aujourd'hui");
  const [selectedTime, setSelectedTime] = useState<string>("11:00");
  const [clientName, setClientName] = useState(currentUser?.name || "Ahmed Jamaleddine");
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || "+212 612 345 678");

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentBarber = barbers.find((b) => b.id === selectedBarberId) || barbers[0];

  const handleConfirm = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      Alert.alert("Coordonnées", "Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    addAppointment({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: currentUser?.email || "client@mybarber.ma",
      serviceName: currentService.name,
      barberName: currentBarber.name,
      date: selectedDate,
      time: selectedTime,
      price: currentService.price,
      status: "Confirmé",
    });

    Alert.alert(
      "Réservation confirmée !",
      `Votre rendez-vous pour ${currentService.name} avec ${currentBarber.name} (${selectedDate} à ${selectedTime}) est validé.\n\nVous avez gagné +20 points de fidélité !`,
      [
        {
          text: "Voir mes rendez-vous",
          onPress: () => router.replace("/client/appointments"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#B8955A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Prendre Rendez-vous</Text>
          <Text style={styles.subtitle}>Sélectionnez votre rituel</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Étape 1 : Choisir la prestation */}
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>1</Text>
          </View>
          <Text style={styles.stepTitle}>Choisir la prestation</Text>
        </View>

        <View style={styles.servicesList}>
          {services.map((item) => {
            const isSelected = selectedServiceId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.serviceOption, isSelected && styles.selectedServiceOption]}
                onPress={() => setSelectedServiceId(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.radioCircle}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.optionHeader}>
                    <Text style={[styles.serviceOptionName, isSelected && styles.selectedText]}>
                      {item.name}
                    </Text>
                    <Text style={styles.serviceOptionPrice}>{item.price} DH</Text>
                  </View>
                  <Text style={styles.serviceOptionDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.serviceOptionMeta}>
                    <Ionicons name="time-outline" size={12} color="#888" />
                    <Text style={styles.metaText}>{item.duration} min</Text>
                    <Text style={styles.metaText}>•</Text>
                    <Text style={styles.metaText}>{item.category}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Étape 2 : Choisir le barbier */}
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>2</Text>
          </View>
          <Text style={styles.stepTitle}>Choisir votre Barbier</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barbersRow}>
          {barbers.map((b) => {
            const isSelected = selectedBarberId === b.id;
            return (
              <TouchableOpacity
                key={b.id}
                style={[styles.barberCard, isSelected && styles.selectedBarberCard]}
                onPress={() => setSelectedBarberId(b.id)}
                activeOpacity={0.8}
              >
                <View style={styles.barberAvatar}>
                  <Ionicons name="person" size={24} color={isSelected ? "#171717" : "#B8955A"} />
                </View>
                <Text style={[styles.barberCardName, isSelected && styles.selectedBarberText]}>
                  {b.name}
                </Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={11} color={isSelected ? "#171717" : "#B8955A"} />
                  <Text style={[styles.barberRating, isSelected && styles.selectedBarberText]}>
                    {b.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Étape 3 : Date */}
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>3</Text>
          </View>
          <Text style={styles.stepTitle}>Choisir le jour</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesRow}>
          {DATE_OPTIONS.map((d) => {
            const isSelected = selectedDate === d.label;
            return (
              <TouchableOpacity
                key={d.label}
                style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                onPress={() => setSelectedDate(d.label)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dateLabel, isSelected && styles.selectedDateText]}>
                  {d.label}
                </Text>
                <Text style={[styles.dateDay, isSelected && styles.selectedDateText]}>
                  {d.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Étape 4 : Heure */}
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>4</Text>
          </View>
          <Text style={styles.stepTitle}>Choisir l'heure</Text>
        </View>

        <View style={styles.timesGrid}>
          {TIME_SLOTS.map((t) => {
            const isSelected = selectedTime === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, isSelected && styles.selectedTimeChip]}
                onPress={() => setSelectedTime(t)}
                activeOpacity={0.8}
              >
                <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Coordonnées Client */}
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>5</Text>
          </View>
          <Text style={styles.stepTitle}>Vos Coordonnées</Text>
        </View>

        <View style={styles.inputsBox}>
          <Text style={styles.inputLabel}>Nom complet</Text>
          <TextInput
            style={styles.input}
            value={clientName}
            onChangeText={setClientName}
            placeholder="Votre nom"
            placeholderTextColor="#777"
          />

          <Text style={styles.inputLabel}>Téléphone de contact</Text>
          <TextInput
            style={styles.input}
            value={clientPhone}
            onChangeText={setClientPhone}
            placeholder="+212 6XX XX XX XX"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
          />
        </View>

        {/* Récapitulatif & Confirmation */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Récapitulatif de votre réservation</Text>
          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Prestation :</Text>
            <Text style={styles.summaryItemValue}>{currentService.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Barbier :</Text>
            <Text style={styles.summaryItemValue}>{currentBarber.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Date & Heure :</Text>
            <Text style={styles.summaryItemValue}>
              {selectedDate} à {selectedTime}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryItemLabel}>Durée estimée :</Text>
            <Text style={styles.summaryItemValue}>{currentService.duration} minutes</Text>
          </View>

          <View style={styles.summaryTotalRow}>
            <Text style={styles.totalLabel}>Total à régler sur place :</Text>
            <Text style={styles.totalPrice}>{currentService.price} DH</Text>
          </View>

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirmer ma réservation</Text>
            <Ionicons name="checkmark-circle" size={20} color="#171717" />
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },
  backBtn: {
    padding: 6,
  },
  headerTitleContainer: {
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
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadgeText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  stepTitle: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
  },
  servicesList: {
    gap: 10,
  },
  serviceOption: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  selectedServiceOption: {
    borderColor: "#B8955A",
    backgroundColor: "rgba(184, 149, 90, 0.1)",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#B8955A",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceOptionName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  selectedText: {
    color: "#B8955A",
  },
  serviceOptionPrice: {
    color: "#B8955A",
    fontSize: 15,
    fontWeight: "bold",
  },
  serviceOptionDesc: {
    color: "#888",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  serviceOptionMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  metaText: {
    color: "#888",
    fontSize: 11,
  },
  barbersRow: {
    flexDirection: "row",
  },
  barberCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    width: 110,
    marginRight: 10,
  },
  selectedBarberCard: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  barberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(184, 149, 90, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  barberCardName: {
    color: "#F8F7F4",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    minHeight: 30,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 4,
  },
  barberRating: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "bold",
  },
  selectedBarberText: {
    color: "#171717",
  },
  datesRow: {
    flexDirection: "row",
  },
  dateCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    marginRight: 8,
  },
  selectedDateCard: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  dateLabel: {
    color: "#888",
    fontSize: 11,
    fontWeight: "600",
  },
  dateDay: {
    color: "#F8F7F4",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
  },
  selectedDateText: {
    color: "#171717",
  },
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChip: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "22%",
    alignItems: "center",
  },
  selectedTimeChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  timeText: {
    color: "#D8C3A5",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedTimeText: {
    color: "#171717",
    fontWeight: "bold",
  },
  inputsBox: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  inputLabel: {
    color: "#D8C3A5",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#1B1B1B",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 10,
    padding: 12,
    color: "#F8F7F4",
    fontSize: 14,
  },
  summaryBox: {
    backgroundColor: "#252525",
    borderWidth: 1.5,
    borderColor: "#B8955A",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
  },
  summaryTitle: {
    color: "#B8955A",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryItemLabel: {
    color: "#888",
    fontSize: 13,
  },
  summaryItemValue: {
    color: "#F8F7F4",
    fontSize: 13,
    fontWeight: "600",
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
    paddingTop: 12,
    marginTop: 6,
    marginBottom: 16,
  },
  totalLabel: {
    color: "#D8C3A5",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#B8955A",
    fontSize: 22,
    fontWeight: "bold",
  },
  confirmBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#B8955A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmBtnText: {
    color: "#171717",
    fontSize: 15,
    fontWeight: "bold",
  },
});
