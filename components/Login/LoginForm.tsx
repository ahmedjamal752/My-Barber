import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // TODO: Connect to authentication API
    router.replace("/admin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#2B2B2B",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2B2B",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 25,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    padding: 15,
  },
  showText: {
    color: "#B8955A",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#B8955A",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#1C1C1C",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});