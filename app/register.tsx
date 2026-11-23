import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="#B8955A" />
            <Text style={styles.backText}>Retour</Text>
          </TouchableOpacity>

          <RegisterHeader />

          <RegisterForm />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Vous avez déjà un compte ?
            </Text>

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  keyboard: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#B8955A",
    fontSize: 15,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 25,
  },
  loginText: {
    color: "#999999",
    fontSize: 14,
  },
  loginLink: {
    color: "#B8955A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
