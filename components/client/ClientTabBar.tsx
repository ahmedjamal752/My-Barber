import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ClientTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      label: "Accueil",
      icon: "home-outline" as const,
      activeIcon: "home" as const,
      route: "/client" as const,
    },
    {
      label: "Services",
      icon: "cut-outline" as const,
      activeIcon: "cut" as const,
      route: "/client/services" as const,
    },
    {
      label: "Réserver",
      icon: "calendar-outline" as const,
      activeIcon: "calendar" as const,
      route: "/client/book" as const,
      isPrimary: true,
    },
    {
      label: "Mes RDV",
      icon: "time-outline" as const,
      activeIcon: "time" as const,
      route: "/client/appointments" as const,
    },
    {
      label: "Profil",
      icon: "person-outline" as const,
      activeIcon: "person" as const,
      route: "/client/profile" as const,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.route ||
          (tab.route === "/client" && pathname === "/client/");

        if (tab.isPrimary) {
          return (
            <TouchableOpacity
              key={tab.label}
              style={styles.primaryTab}
              onPress={() => router.push(tab.route)}
              activeOpacity={0.85}
            >
              <View style={styles.primaryCircle}>
                <Ionicons name="calendar" size={22} color="#171717" />
              </View>
              <Text style={styles.primaryLabel}>{tab.label}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={20}
              color={isActive ? "#B8955A" : "#888888"}
            />
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderTopWidth: 1,
    borderTopColor: "#2C2C2C",
    paddingBottom: 22,
    paddingTop: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 3,
  },
  tabLabel: {
    color: "#888888",
    fontSize: 10,
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#B8955A",
    fontWeight: "bold",
  },
  primaryTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
    gap: 3,
  },
  primaryCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#B8955A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#B8955A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#171717",
  },
  primaryLabel: {
    color: "#B8955A",
    fontSize: 10,
    fontWeight: "bold",
  },
});
