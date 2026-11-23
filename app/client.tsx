import { View, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ClientHeader from "../components/clienthome/ClientHeader";
import SalonCard from "../components/clienthome/SalonCard";
import ActionButtons from "../components/clienthome/ActionButtons";
import NextAppointment from "../components/clienthome/NextAppointment";
import ServicesList from "../components/clienthome/ServicesList";
import BarbersList from "../components/clienthome/BarbersList";
import ClientTabBar from "../components/clienthome/ClientTabBar";
import React from "react";

export default function ClientHome() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar style="light" />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ClientHeader />
        <SalonCard />
        <ActionButtons />
        <NextAppointment />
        <ServicesList />
        <BarbersList />
      </ScrollView>

      <View style={styles.tabBarWrapper}>
        <ClientTabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 16,
  },
  tabBarWrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
});