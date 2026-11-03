import React from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import WelcomeLogo from "../acceuill/WelcomeLogo";
import WelcomeButtons from "../acceuill/WelcomeButtons";
import WelcomeFooter from "../acceuill/WelcomeFooter";

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 750;
  const horizontalPadding = Math.min(Math.max(width * 0.075, 20), 36);
  const componentGap = height < 700 ? 18 : height < 850 ? 24 : 30;

  return (
    <View style={styles.outerContainer}>
      <StatusBar style="light" />

      {/* Image de fond plein écran */}
      <Image
        source={require("../../assets/images/barber.jpg")}
        style={styles.fill}
        resizeMode="cover"
      />

      {/* Dégradé sombre */}
      <LinearGradient
        colors={["transparent", "rgba(23, 23, 23, 0.6)", "#171717"]}
        locations={[0, 0.45, 0.85]}
        style={styles.fill}
      >
        <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.content,
              {
                paddingHorizontal: horizontalPadding,
                paddingBottom: isSmallScreen ? 12 : 24,
                gap: componentGap,
              },
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentInsetAdjustmentBehavior="never"
          >
            <WelcomeLogo />
            <WelcomeButtons />
            <WelcomeFooter />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#171717",
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});