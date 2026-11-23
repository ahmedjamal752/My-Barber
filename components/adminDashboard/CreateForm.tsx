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

export type FormField = {
  name: string;
  key: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  defaultValue?: string;
};

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  fields: FormField[];
  onSubmitData?: (values: Record<string, string>) => void;
};

export default function CreateForm({
  title,
  subtitle,
  buttonText,
  fields,
  onSubmitData,
}: Props) {
  const router = useRouter();

  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.defaultValue) init[f.key] = f.defaultValue;
    });
    return init;
  });

  const handleSubmit = () => {
    const emptyField = fields.find((f) => !values[f.key]?.trim());
    if (emptyField) {
      Alert.alert("Champs manquants", `Veuillez remplir le champ : "${emptyField.name}".`);
      return;
    }

    const emailField = fields.find((f) => f.keyboardType === "email-address");
    if (emailField && values[emailField.key]) {
      if (!/^\S+@\S+\.\S+$/.test(values[emailField.key])) {
        Alert.alert("Email invalide", "Veuillez renseigner une adresse email correcte.");
        return;
      }
    }

    if (onSubmitData) {
      onSubmitData(values);
    }

    Alert.alert(
      "Succès",
      `${title} a été enregistré avec succès !`,
      [
        {
          text: "Parfait",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
            <Ionicons name="arrow-back" size={20} color="#B8955A" />
            <Text style={styles.backText}>Retour au tableau de bord</Text>
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Formulaire */}
          <View style={styles.form}>
            {fields.map((field) => (
              <View key={field.key} style={styles.field}>
                <Text style={styles.label}>{field.name}</Text>
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
                  value={values[field.key] || ""}
                  onChangeText={(val) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: val,
                    }))
                  }
                />
              </View>
            ))}

            <TouchableOpacity
              style={styles.submit}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text style={styles.submitText}>{buttonText}</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#171717" />
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
    paddingTop: 15,
    paddingBottom: 50,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#B8955A",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: "#F8F7F4",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#999",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  form: {
    marginTop: 25,
    gap: 18,
  },
  field: {
    gap: 8,
  },
  label: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 12,
    padding: 15,
    color: "#F8F7F4",
    fontSize: 15,
  },
  submit: {
    backgroundColor: "#B8955A",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 15,
    shadowColor: "#B8955A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "bold",
  },
});
