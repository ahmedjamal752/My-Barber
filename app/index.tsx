import {
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeLogo from "../components/acceuill/WelcomeLogo";
import WelcomeButtons from "../components/acceuill/WelcomeButtons";
import WelcomeFooter from "../components/acceuill/WelcomeFooter";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../assets/barber.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["transparent", "#171717", "#171717"]}
        locations={[0, 0.55, 1]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <WelcomeLogo />

            <WelcomeButtons />

            <WelcomeFooter />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 35,
    gap: 30,
  },
});