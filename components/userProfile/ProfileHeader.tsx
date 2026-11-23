
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { User } from "./user";

interface Props {
  user: User;
  onEditPhoto: (photoUri: string) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function ProfileHeader({ user, onEditPhoto }: Props) {

  const handleEditPhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission requise",
          "Veuillez autoriser l'accès à votre galerie pour modifier votre photo."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        onEditPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);

      Alert.alert(
        "Erreur",
        "Impossible de sélectionner cette image."
      );
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={handleEditPhoto}
        activeOpacity={0.8}
      >
        {user.photoUrl ? (
          <Image
            source={{ uri: user.photoUrl }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.initials}>
              {getInitials(user.fullName)}
            </Text>
          </View>
        )}

        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={14} color="#171717" />
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{user.fullName}</Text>

      <Text style={styles.memberSince}>
        Membre depuis {user.memberSince}
      </Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.totalBookings}</Text>
          <Text style={styles.statLabel}>Rendez-vous</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.upcomingBookings}</Text>
          <Text style={styles.statLabel}>À venir</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#B8955A",
  },

  avatarFallback: {
    backgroundColor: "#252525",
    alignItems: "center",
    justifyContent: "center",
  },

  initials: {
    color: "#B8955A",
    fontSize: 34,
    fontWeight: "bold",
  },

  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 2,
    backgroundColor: "#B8955A",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 14,
  },

  memberSince: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
  },

  stats: {
    flexDirection: "row",
    backgroundColor: "#252525",
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 14,
    width: "100%",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "#B8955A",
    fontSize: 20,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#D8C3A5",
    fontSize: 12,
    marginTop: 2,
  },

  divider: {
    width: 1,
    backgroundColor: "#3a3a3a",
  },
});
