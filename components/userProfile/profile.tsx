import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";
import ProfileRow from "./ProfileRow";

import type { User } from "./user";

// TODO: Replace with data from your auth context / API.
const MOCK_USER: User = {
  id: "1",
  fullName: "Youssef El Amrani",
  email: "youssef@email.com",
  phone: "+212 6 12 34 56 78",
  role: "client",
  language: "fr",
  notificationsEnabled: true,
  memberSince: "janvier 2026",
  totalBookings: 12,
  upcomingBookings: 1,
};

type Appointment = {
  id: string;
  barberName: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
};

// Example data only. Replace this with appointments from your backend API.
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    barberName: "Amine Benali",
    service: "Coupe classique",
    date: "Samedi 7 novembre 2026",
    time: "14:30",
    status: "confirmed",
  },
  {
    id: "2",
    barberName: "Yassine Karim",
    service: "Coupe + Barbe",
    date: "Mardi 10 novembre 2026",
    time: "16:00",
    status: "pending",
  },
];

const LANGUAGE_LABELS = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

type EditableField = "fullName" | "email" | "phone";

export default function UserProfileScreen() {
  const [user, setUser] = useState<User>(MOCK_USER);

  // Language modal
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  // Upcoming appointments modal
  const [appointmentsModalVisible, setAppointmentsModalVisible] =
    useState(false);

  // Handle language selection
  const handleLanguageChange = (language: User["language"]) => {
    setUser((prev) => ({
      ...prev,
      language,
    }));

    setLanguageModalVisible(false);
  };

  // Edit profile modal
  const [editField, setEditField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState("");

  // Open edit modal
  const openEditModal = (field: EditableField) => {
    setPasswordModalVisible(false);
    setAppointmentsModalVisible(false);
    setLanguageModalVisible(false);
    setEditField(field);
    setEditValue(user[field]);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditField(null);
    setEditValue("");
  };

  // Get modal title
  const getFieldTitle = () => {
    switch (editField) {
      case "fullName":
        return "Modifier le nom complet";
      case "email":
        return "Modifier l'adresse email";
      case "phone":
        return "Modifier le numéro de téléphone";
      default:
        return "";
    }
  };

  // Save profile changes
  const handleSave = () => {
    const value = editValue.trim();

    if (!value) {
      Alert.alert("Erreur", "Ce champ ne peut pas être vide.");
      return;
    }

    if (editField === "fullName" && value.length < 2) {
      Alert.alert("Erreur", "Le nom doit contenir au moins 2 caractères.");
      return;
    }

    if (
      editField === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      Alert.alert("Erreur", "Veuillez saisir une adresse email valide.");
      return;
    }

    if (editField === "phone" && value.length < 8) {
      Alert.alert("Erreur", "Veuillez saisir un numéro de téléphone valide.");
      return;
    }

    if (editField) {
      setUser((prev) => ({
        ...prev,
        [editField]: value,
      }));
    }

    closeEditModal();
  };

  // Password change modal
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Open password modal
  const openPasswordModal = () => {
    setEditField(null);
    setAppointmentsModalVisible(false);
    setLanguageModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordModalVisible(true);
  };

  // Close password modal
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Submit password change
  const handleChangePassword = () => {
    if (!currentPassword) {
      Alert.alert("Erreur", "Veuillez saisir votre mot de passe actuel.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert(
        "Erreur",
        "Le nouveau mot de passe doit contenir au moins 8 caractères."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert(
        "Erreur",
        "Le nouveau mot de passe doit être différent de l'actuel."
      );
      return;
    }

    // TODO: Replace with API call to change password.
    console.log("Change password", { currentPassword, newPassword });

    closePasswordModal();
    Alert.alert("Succès", "Votre mot de passe a été modifié.");
  };

  // Handle profile photo selection
  const handleEditPhoto = (photoUri: string) => {
    setUser((prev) => ({
      ...prev,
      photoUrl: photoUri,
    }));
  };

  // Logout
  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => console.log("Logout"),
          // TODO: Clear session + redirect to welcome.
        },
      ]
    );
  };

  // Delete account
  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Toutes vos données et réservations seront supprimées.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => console.log("Delete account"),
          // TODO: API call.
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Mon profil</Text>

        {/* Profile Header */}
        <ProfileHeader user={user} onEditPhoto={handleEditPhoto} />

        {/* Personal Information */}
        <ProfileSection title="Informations personnelles">
          <ProfileRow
            icon="person-outline"
            label="Nom complet"
            value={user.fullName}
            onPress={() => openEditModal("fullName")}
          />

          <ProfileRow
            icon="mail-outline"
            label="Email"
            value={user.email}
            onPress={() => openEditModal("email")}
          />

          <ProfileRow
            icon="call-outline"
            label="Téléphone"
            value={user.phone}
            onPress={() => openEditModal("phone")}
          />

          <ProfileRow
            icon="lock-closed-outline"
            label="Modifier le mot de passe"
            onPress={openPasswordModal}
            isLast
          />
        </ProfileSection>

        {/* Preferences */}
        <ProfileSection title="Préférences">
          <ProfileRow
            icon="notifications-outline"
            label="Notifications"
            switchValue={user.notificationsEnabled}
            onSwitchChange={(value) =>
              setUser((prev) => ({
                ...prev,
                notificationsEnabled: value,
              }))
            }
          />

          <ProfileRow
            icon="language-outline"
            label="Langue"
            value={LANGUAGE_LABELS[user.language]}
            onPress={() => setLanguageModalVisible(true)}
            isLast
          />
        </ProfileSection>

        {/* My Appointments */}
        <ProfileSection title="Mes rendez-vous">
          <ProfileRow
            icon="calendar-outline"
            label="Prochains rendez-vous"
            value={`${MOCK_APPOINTMENTS.length}`}
            onPress={() => setAppointmentsModalVisible(true)}
            isLast
          />
        </ProfileSection>

        {/* Account */}
        <ProfileSection title="Compte">
          <ProfileRow
            icon="log-out-outline"
            label="Se déconnecter"
            onPress={handleLogout}
            destructive
          />

          <ProfileRow
            icon="trash-outline"
            label="Supprimer mon compte"
            onPress={handleDeleteAccount}
            destructive
            isLast
          />
        </ProfileSection>

        <Text style={styles.version}>My Barber v1.0.0</Text>
      </ScrollView>

      {/* EDIT PROFILE MODAL */}
      <Modal
        visible={editField !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEditModal}
      >
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{getFieldTitle()}</Text>

              <TextInput
                style={styles.input}
                value={editValue}
                onChangeText={setEditValue}
                placeholder="Saisissez votre nouvelle valeur"
                placeholderTextColor="#777"
                keyboardType={
                  editField === "email"
                    ? "email-address"
                    : editField === "phone"
                      ? "phone-pad"
                      : "default"
                }
                autoCapitalize={editField === "email" ? "none" : "words"}
                autoCorrect={editField === "fullName"}
                maxLength={editField === "fullName" ? 60 : 100}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeEditModal}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* CHANGE PASSWORD MODAL */}
      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closePasswordModal}
      >
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Modifier le mot de passe</Text>

              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Mot de passe actuel"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nouveau mot de passe"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={[styles.input, styles.lastInput]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmer le nouveau mot de passe"
                placeholderTextColor="#777"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closePasswordModal}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleChangePassword}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* LANGUAGE SELECTION MODAL */}
      <Modal
        visible={languageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choisir une langue</Text>

            {(
              [
                { code: "fr", label: "Français" },
                { code: "en", label: "English" },
                { code: "ar", label: "العربية" },
              ] as const
            ).map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  user.language === language.code && styles.selectedLanguage,
                ]}
                onPress={() => handleLanguageChange(language.code)}
                activeOpacity={0.7}
              >
                <Text style={styles.languageText}>{language.label}</Text>

                {user.language === language.code && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color="#B8955A"
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setLanguageModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* UPCOMING APPOINTMENTS MODAL */}
      <Modal
        visible={appointmentsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAppointmentsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.appointmentsModal}>
            {/* Modal header */}
            <View style={styles.appointmentsHeader}>
              <View>
                <Text style={styles.modalTitle}>Prochains rendez-vous</Text>
                <Text style={styles.appointmentsSubtitle}>
                  Vos réservations à venir
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setAppointmentsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={22} color="#F8F7F4" />
              </TouchableOpacity>
            </View>

            {/* Appointment list */}
            {MOCK_APPOINTMENTS.length === 0 ? (
              <View style={styles.emptyAppointments}>
                <Ionicons
                  name="calendar-outline"
                  size={48}
                  color="#B8955A"
                />

                <Text style={styles.emptyTitle}>
                  Aucun rendez-vous prévu
                </Text>

                <Text style={styles.emptyDescription}>
                  Vous n'avez pas encore de réservation à venir.
                </Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.appointmentsList}
              >
                {MOCK_APPOINTMENTS.map((appointment) => (
                  <View
                    key={appointment.id}
                    style={styles.appointmentCard}
                  >
                    {/* Service and status */}
                    <View style={styles.appointmentTop}>
                      <Text style={styles.appointmentService}>
                        {appointment.service}
                      </Text>

                      <View
                        style={[
                          styles.statusBadge,
                          appointment.status === "confirmed"
                            ? styles.confirmedBadge
                            : styles.pendingBadge,
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {appointment.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.appointmentDetail}>
                      <Ionicons
                        name="person-outline"
                        size={17}
                        color="#B8955A"
                      />
                      <Text style={styles.appointmentDetailText}>
                        {appointment.barberName}
                      </Text>
                    </View>

                    <View style={styles.appointmentDetail}>
                      <Ionicons
                        name="calendar-outline"
                        size={17}
                        color="#B8955A"
                      />
                      <Text style={styles.appointmentDetailText}>
                        {appointment.date}
                      </Text>
                    </View>

                    <View style={styles.appointmentDetail}>
                      <Ionicons
                        name="time-outline"
                        size={17}
                        color="#B8955A"
                      />
                      <Text style={styles.appointmentDetailText}>
                        {appointment.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setAppointmentsModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeModalButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#171717",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  screenTitle: {
    color: "#B8955A",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },

  version: {
    color: "#777",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },

  // Modal layout
  keyboardContainer: {
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },

  modalTitle: {
    color: "#B8955A",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#F8F7F4",
    fontSize: 15,
    marginBottom: 12,
  },

  lastInput: {
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#383838",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#D8C3A5",
    fontWeight: "600",
  },

  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#B8955A",
  },

  saveButtonText: {
    color: "#171717",
    fontWeight: "bold",
  },

  // Language selection styles
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#383838",
  },

  selectedLanguage: {
    borderColor: "#B8955A",
    backgroundColor: "#30291F",
  },

  languageText: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "500",
  },

  // Upcoming appointments modal styles
  appointmentsModal: {
    width: "100%",
    maxHeight: "80%",
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#3a3a3a",
  },

  appointmentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  appointmentsSubtitle: {
    color: "#999",
    fontSize: 13,
    marginTop: -12,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#383838",
    alignItems: "center",
    justifyContent: "center",
  },

  appointmentsList: {
    maxHeight: 420,
  },

  appointmentCard: {
    backgroundColor: "#171717",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#383838",
  },

  appointmentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  appointmentService: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  confirmedBadge: {
    backgroundColor: "#183B2A",
  },

  pendingBadge: {
    backgroundColor: "#40351F",
  },

  statusText: {
    color: "#F8F7F4",
    fontSize: 11,
    fontWeight: "600",
  },

  appointmentDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  appointmentDetailText: {
    color: "#BDBDBD",
    fontSize: 13,
    flexShrink: 1,
  },

  emptyAppointments: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 35,
  },

  emptyTitle: {
    color: "#F8F7F4",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },

  emptyDescription: {
    color: "#999",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },

  closeModalButton: {
    backgroundColor: "#B8955A",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  closeModalButtonText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 14,
  },
});