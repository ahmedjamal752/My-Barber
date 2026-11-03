import { View, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ProfileSection({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: {
    color: "#D8C3A5",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#252525",
    borderRadius: 12,
    overflow: "hidden",
  },
});
