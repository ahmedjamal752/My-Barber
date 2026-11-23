import { View, Text, StyleSheet, Platform } from "react-native";

type Props = {
  firstName?: string;
};

export default function ClientHeader({ firstName = "[Prénom]" }: Props) {
  return (
    <View>
      <Text style={styles.welcome}>Bienvenue</Text>
      <Text style={styles.title}>Bonjour, {firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    color: "#D8C3A5",
    fontSize: 14,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 4,
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
      default: "Georgia, 'Times New Roman', serif",
    }),
  },
});
