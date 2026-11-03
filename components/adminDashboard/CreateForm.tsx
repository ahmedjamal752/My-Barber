
import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Field = {
  name: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
};

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  fields: Field[];
};

export default function CreateForm({
  title,
  subtitle,
  buttonText,
  fields,
}: Props) {
  const router = useRouter();

  const [values, setValues] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const emptyField = fields.find(
      (field) => !values[field.name]?.trim()
    );

    if (emptyField) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    const emailField = fields.find(
      (field) => field.keyboardType === "email-address"
    );

    if (
      emailField &&
      !/^\S+@\S+\.\S+$/.test(values[emailField.name])
    ) {
      Alert.alert("Erreur", "Adresse email invalide.");
      return;
    }

    Alert.alert(
      "Succès",
      `${title} : formulaire validé !`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Bouton retour */}
          <TouchableOpacity
            style={styles.back}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#B8955A"
            />

            <Text style={styles.backText}>
              Retour au dashboard
            </Text>
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

          {/* Formulaire */}
          <View style={styles.form}>
            {fields.map((field) => (
              <View key={field.name} style={styles.field}>
                <Text style={styles.label}>
                  {field.name}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor="#777"
                  keyboardType={field.keyboardType || "default"}
                  autoCapitalize={
                    field.keyboardType === "email-address"
                      ? "none"
                      : "sentences"
                  }
                  value={values[field.name] || ""}
                  onChangeText={(value) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.name]: value,
                    }))
                  }
                />
              </View>
            ))}

            {/* Bouton enregistrer */}
            <TouchableOpacity
              style={styles.submit}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitText}>
                {buttonText}
              </Text>
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

  container: {
    flex: 1,
    backgroundColor: "#171717",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 50,
  },

  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 35,
  },

  backText: {
    color: "#B8955A",
    fontSize: 14,
    fontWeight: "500",
  },

  title: {
    color: "#F8F7F4",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#999",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
  },

  form: {
    marginTop: 30,
    gap: 20,
  },

  field: {
    gap: 10,
  },

  label: {
    color: "#D8C3A5",
    fontSize: 14,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 12,
    padding: 16,
    color: "#F8F7F4",
    fontSize: 15,
  },

  submit: {
    backgroundColor: "#B8955A",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  submitText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
  },
});
