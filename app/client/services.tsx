import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import ClientTabBar from "../../components/client/ClientTabBar";

export default function ClientServicesScreen() {
  const router = useRouter();
  const { services } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [search, setSearch] = useState("");

  const categories = ["Tous", "Coupe", "Barbe", "Soin", "Combo"];

  const filtered = services.filter((s) => {
    const matchCategory = selectedCategory === "Tous" || s.category === selectedCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Nos Prestations</Text>
          <Text style={styles.subtitle}>L'excellence du savoir-faire barbier</Text>
        </View>

        <TouchableOpacity
          style={styles.bookShortcut}
          onPress={() => router.push("/client/book")}
          activeOpacity={0.8}
        >
          <Ionicons name="calendar" size={16} color="#171717" />
          <Text style={styles.bookShortcutText}>Réserver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color="#B8955A" />
          <TextInput
            placeholder="Rechercher une prestation (dégradé, barbe...)"
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={16} color="#777" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.activeCategoryChip]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.counterText}>
          {filtered.length} prestation{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
        </Text>

        {/* Services List */}
        <View style={styles.list}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.serviceIcon}>
                  <Ionicons name="cut" size={20} color="#B8955A" />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAIRE</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardBottom}>
                <View style={styles.metaLeft}>
                  <View style={styles.durationBadge}>
                    <Ionicons name="time-outline" size={12} color="#D8C3A5" />
                    <Text style={styles.durationText}>{item.duration} min</Text>
                  </View>
                  <Text style={styles.price}>{item.price} DH</Text>
                </View>

                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => router.push("/client/book")}
                  activeOpacity={0.85}
                >
                  <Text style={styles.bookBtnText}>Choisir</Text>
                  <Ionicons name="chevron-forward" size={14} color="#171717" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <ClientTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#252525",
  },
  title: {
    color: "#F8F7F4",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  bookShortcut: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookShortcutText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  search: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: "#F8F7F4",
    paddingVertical: 12,
    fontSize: 14,
  },
  categoriesRow: {
    flexDirection: "row",
  },
  categoryChip: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: "#B8955A",
    borderColor: "#B8955A",
  },
  categoryText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#171717",
    fontWeight: "bold",
  },
  counterText: {
    color: "#888",
    fontSize: 12,
    marginTop: -4,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 14,
  },
  cardTop: {
    flexDirection: "row",
    gap: 12,
  },
  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  name: {
    color: "#F8F7F4",
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
  },
  popularBadge: {
    backgroundColor: "rgba(184, 149, 90, 0.2)",
    borderWidth: 0.5,
    borderColor: "#B8955A",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularText: {
    color: "#B8955A",
    fontSize: 9,
    fontWeight: "bold",
  },
  description: {
    color: "#888",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: "#D8C3A5",
    fontSize: 11,
  },
  price: {
    color: "#B8955A",
    fontSize: 18,
    fontWeight: "bold",
  },
  bookBtn: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookBtnText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
});
