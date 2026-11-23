import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  destructive?: boolean;
  isLast?: boolean;
}

export default function ProfileRow({
  icon,
  label,
  value,
  onPress,
  switchValue,
  onSwitchChange,
  destructive = false,
  isLast = false,
}: Props) {
  const isSwitch = switchValue !== undefined;
  const color = destructive ? "#D64545" : "#F8F7F4";
  const Container: any = isSwitch || !onPress ? View : TouchableOpacity;

  return (
    <Container
      style={[styles.row, !isLast && styles.border]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={20}
        color={destructive ? "#D64545" : "#B8955A"}
      />
      <Text style={[styles.label, { color }]}>{label}</Text>

      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: "#3a3a3a", true: "#B8955A" }}
          thumbColor="#F8F7F4"
        />
      ) : (
        <>
          {value ? <Text style={styles.value}>{value}</Text> : null}
          {onPress && !destructive ? (
            <Ionicons name="chevron-forward" size={18} color="#777" />
          ) : null}
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  border: { borderBottomWidth: 1, borderBottomColor: "#333" },
  label: { flex: 1, fontSize: 15 },
  value: { color: "#D8C3A5", fontSize: 14, maxWidth: "50%" },
});
