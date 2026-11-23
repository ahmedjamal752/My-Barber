import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "../../lib/store";
import { Service } from "../../lib/mockData";

export default function ServicesScreen() {
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

  const handleServiceDetail = (item: Service) => {
    Alert.alert(
      item.name,
      `Catégorie : ${item.category}\nPrix : ${item.price} DH\nDurée : ${item.duration} min\n\n${item.description}`,
      [
        {
          text: "Prendre RDV avec ce service",
          onPress: () => router.push("/admin/add-appointment"),
        },
        { text: "Fermer", style: "cancel" },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#B8955A" />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>Catalogue Prestations</Text>
          <Text style={styles.subtitle}>Services et grille tarifaire</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/admin/service")}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#171717" />
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color="#B8955A" />
          <TextInput
            placeholder="Rechercher une prestation..."
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

        {/* Categories Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.activeCategoryChip]}
              onPress={() => setSelectedCategory(cat)}
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
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleServiceDetail(item)}
              activeOpacity={0.8}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="cut" size={20} color="#B8955A" />
              </View>

              <View style={styles.cardBody}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>POPULAIRE</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.durationPill}>
                    <Ionicons name="time-outline" size={12} color="#D8C3A5" />
                    <Text style={styles.durationText}>{item.duration} min</Text>
                  </View>
                  <Text style={styles.price}>{item.price} DH</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  backButton: {
    padding: 6,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#F8F7F4",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#B8955A",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#171717",
    fontWeight: "bold",
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: "#F8F7F4",
    paddingVertical: 12,
    fontSize: 14,
  },
  categoriesRow: {
    flexDirection: "row",
    marginBottom: 16,
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
    marginBottom: 12,
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
    flexDirection: "row",
    gap: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(184, 149, 90, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
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
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  durationPill: {
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
    fontSize: 16,
    fontWeight: "bold",
  },
});
