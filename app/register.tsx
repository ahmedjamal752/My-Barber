import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import RegisterHeader from "../components/register/RegisterHeader";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Retour</Text>
        </TouchableOpacity>

        <RegisterHeader />

        <RegisterForm />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Vous avez déjà un compte ?
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
          >
            <Text style={styles.loginLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 30,
  },
  backText: {
    color: "#B8955A",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 25,
  },
  loginText: {
    color: "#999",
  },
  loginLink: {
    color: "#B8955A",
    fontWeight: "bold",
  },
});