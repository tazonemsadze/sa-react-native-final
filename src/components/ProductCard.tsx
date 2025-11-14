// FILE: src/components/ProductCard.tsx
// UPDATED - Added clickable image

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any) => void;
  onPress: () => void;
}

const ProductCard = ({ product, onAddToCart, onPress }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(product)}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 10,
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    minHeight: 40,
  },
  category: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
    textTransform: "capitalize",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
