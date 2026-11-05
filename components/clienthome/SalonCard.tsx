import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  name?: string;
  address?: string;
  hours?: string;
};

export default function SalonCard({
  name = "My Barber",
  address = "[Adresse du salon]",
  hours = "[horaires]",
}: Props) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/barber.jpg")}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(37,37,37,0.1)", "rgba(37,37,37,0.95)"]}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>
          {address} · Ouvert {hours}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    borderRadius: 20,
    backgroundColor: "#252525",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  info: {
    padding: 18,
  },
  name: {
    color: "#F8F7F4",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    color: "#D8C3A5",
    fontSize: 13,
    marginTop: 3,
  },
});