import { View, StyleSheet } from "react-native";

import LoginLogo from "../Login/LoginLogo";
import LoginForm from "../Login/LoginForm";
import LoginFooter from "../Login/LoginFooter";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <LoginLogo />
      <LoginForm />
      <LoginFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    padding: 25,
  },
});