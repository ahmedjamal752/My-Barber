import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";

const TIME_SLOTS = [
  "09:30",
  "10:00",
  "10:45",
  "11:30",
  "12:15",
  "14:00",
  "14:45",
  "15:30",
  "16:15",
  "17:00",
  "18:00",
  "19:00",
];

const DATE_OPTIONS = ["Aujourd'hui", "Demain", "Après-demain", "Samedi", "Dimanche"];

export default function AddAppointmentScreen() {
  const router = useRouter();
  const { services, barbers, clients, addAppointment } = useAppStore();

  const [clientMode, setClientMode] = useState<"existing" | "new">("existing");
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || "");
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");

  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || "");
  const [selectedBarberId, setSelectedBarberId] = useState<string>(barbers[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>("Aujourd'hui");
  const [selectedTime, setSelectedTime] = useState<string>("11:30");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    let clientName = "";
    let clientPhone = "";

    if (clientMode === "existing") {
      const client = clients.find((c) => c.id === selectedClientId);
      if (!client) {
        Alert.alert("Erreur", "Veuillez sélectionner un client existant.");
        return;
      }
      clientName = client.name;
      clientPhone = client.phone;
    } else {
      if (!newClientName.trim() || !newClientPhone.trim()) {
        Alert.alert("Erreur", "Veuillez saisir le nom et le téléphone du nouveau client.");
        return;
      }
      clientName = newClientName.trim();
      clientPhone = newClientPhone.trim();
    }

    const service = services.find((s) => s.id === selectedServiceId) || services[0];
    const barber = barbers.find((b) => b.id === selectedBarberId) || barbers[0];

    addAppointment({
      clientName,
      clientPhone,
      clientEmail: `${clientName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      serviceName: service.name,
      barberName: barber.name,
      date: selectedDate,
      time: selectedTime,
      price: service.price,
      status: "Confirmé",
    });

    Alert.alert(
      "Rendez-vous planifié !",
      `Le rendez-vous pour ${clientName} avec ${barber.name} (${service.name}) a été enregistré.`,
      [
        {
          text: "Voir les rendez-vous",
          onPress: () => router.replace("/admin/appointment"),
        },
      ]
    );
  };

  const currentService = services.find((s) => s.id === selectedServiceId);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#B8955A" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Nouveau Rendez-vous</Text>
          <Text style={styles.subtitle}>Prise de RDV au salon</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1 : Choix du Client */}
        <Text style={styles.sectionTitle}>1. Client</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, clientMode === "existing" && styles.activeTab]}
            onPress={() => setClientMode("existing")}
          >
            <Text style={[styles.tabText, clientMode === "existing" && styles.activeTabText]}>
              Client Existant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, clientMode === "new" && styles.activeTab]}
            onPress={() => setClientMode("new")}
          >
            <Text style={[styles.tabText, clientMode === "new" && styles.activeTabText]}>
              Nouveau Client
            </Text>
          </TouchableOpacity>
        </View>

        {clientMode === "existing" ? (
          <View style={styles.clientPicker}>
            {clients.map((c) => {
              const isSelected = selectedClientId === c.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.clientOption, isSelected && styles.selectedOption]}
                  onPress={() => setSelectedClientId(c.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.clientRadio}>
                    {isSelected && <View style={styles.clientRadioInner} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.optionName, isSelected && styles.selectedOptionText]}>
                      {c.name}
                    </Text>
                    <Text style={styles.optionSub}>{c.phone}</Text>
                  </View>
                  <Text style={styles.optionVisits}>{c.appointmentsCount} visites</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.newClientBox}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex : Karim Bennani"
              placeholderTextColor="#777"
              value={newClientName}
              onChangeText={setNewClientName}
            />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="+212 6XX XX XX XX"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              value={newClientPhone}
              onChangeText={setNewClientPhone}
            />
          </View>
        )}

        {/* Section 2 : Prestation */}
        <Text style={styles.sectionTitle}>2. Prestation / Service</Text>
        <View style={styles.optionsGrid}>
          {services.map((s) => {
            const isSelected = selectedServiceId === s.id;
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceCard, isSelected && styles.selectedCard]}
                onPress={() => setSelectedServiceId(s.id)}
                activeOpacity={0.8}
              >
                <View style={styles.serviceHeader}>
                  <Text style={[styles.serviceName, isSelected && styles.selectedText]}>
                    {s.name}
                  </Text>
                  <Text style={styles.servicePrice}>{s.price} DH</Text>
                </View>
                <Text style={styles.serviceMeta}>
                  {s.duration} min • {s.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section 3 : Coiffeur */}
        <Text style={styles.sectionTitle}>3. Barbier assigné</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barbersRow}>
          {barbers.map((b) => {
            const isSelected = selectedBarberId === b.id;
            return (
              <TouchableOpacity
                key={b.id}
                style={[styles.barberChip, isSelected && styles.selectedBarberChip]}
                onPress={() => setSelectedBarberId(b.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="person"
                  size={18}
                  color={isSelected ? "#171717" : "#B8955A"}
                />
                <Text style={[styles.barberName, isSelected && styles.selectedBarberText]}>
                  {b.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section 4 : Date & Créneau */}
        <Text style={styles.sectionTitle}>4. Jour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {DATE_OPTIONS.map((d) => {
            const isSelected = selectedDate === d;
            return (
              <TouchableOpacity
                key={d}
                style={[styles.chip, isSelected && styles.selectedChip]}
                onPress={() => setSelectedDate(d)}
              >
                <Text style={[styles.chipText, isSelected && styles.selectedChipText]}>
                  {d}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>5. Heure</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((t) => {
            const isSelected = selectedTime === t;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.timeSlot, isSelected && styles.selectedTimeSlot]}
                onPress={() => setSelectedTime(t)}
              >
                <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Total & Confirmation Button */}
        <View style={styles.footerSummary}>
          <View>
            <Text style={styles.summaryLabel}>Total prestation</Text>
            <Text style={styles.summaryPrice}>{currentService?.price || 90} DH</Text>
            <Text style={styles.summaryMeta}>
              {selectedDate} à {selectedTime}
            </Text>
          </View>

          <TouchableOpacity style={styles.confirmBtn} onPress={handleSave} activeOpacity={0.85}>
            <Text style={styles.confirmBtnText}>Confirmer le RDV</Text>
            <Ionicons name="checkmark-circle" size={18} color="#171717" />
          </TouchableOpacity>
        </View>
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
    fontSize: 22,
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
  sectionTitle: {
    color: "#D8C3A5",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#252525",
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#B8955A",
  },
  tabText: {
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#171717",
    fontWeight: "bold",
  },
  clientPicker: {
    gap: 8,
  },
  clientOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 10,
    gap: 12,
  },
  selectedOption: {
    borderColor: "#B8955A",
    backgroundColor: "rgba(184, 149, 90, 0.1)",
  },
  clientRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
  },
  clientRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#B8955A",
  },
  optionName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedOptionText: {
    color: "#B8955A",
  },
  optionSub: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  optionVisits: {
    color: "#B8955A",
    fontSize: 11,
    fontWeight: "600",
  },
  newClientBox: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    padding: 14,
    borderRadius: 12,
    gap: 6,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 8,
    padding: 12,
    color: "#F8F7F4",
    fontSize: 14,
  },
  optionsGrid: {
    gap: 8,
  },
  serviceCard: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 10,
  },
  selectedCard: {
    borderColor: "#B8955A",
    backgroundColor: "rgba(184, 149, 90, 0.12)",
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    color: "#F8F7F4",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedText: {
    color: "#B8955A",
  },
  servicePrice: {
    color: "#B8955A",
    fontSize: 14,
    fontWeight: "bold",
  },
  serviceMeta: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
  },
  barbersRow: {
    flexDirection: "row",
    gap: 8,
  },
  barberChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  selectedBarberChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  barberName: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
  },
  selectedBarberText: {
    color: "#171717",
  },
  chipsRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  chip: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  chipText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  selectedChipText: {
    color: "#171717",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeSlot: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "22%",
    alignItems: "center",
  },
  selectedTimeSlot: {
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
  },
  footerSummary: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#B8955A",
    borderRadius: 14,
    padding: 16,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryLabel: {
    color: "#888",
    fontSize: 11,
  },
  summaryPrice: {
    color: "#B8955A",
    fontSize: 20,
    fontWeight: "bold",
  },
  summaryMeta: {
    color: "#D8C3A5",
    fontSize: 11,
    marginTop: 2,
  },
  confirmBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  confirmBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 14,
  },
});
