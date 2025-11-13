import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import { CartItem, Product } from "../types";
import { getCart, saveCart } from "../utils/storage";

export const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    const cartData = await getCart();
    setCart(cartData);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const existingItemIndex = cart.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedCart: CartItem[];

      if (existingItemIndex !== -1) {
        updatedCart = [...cart];
        if (updatedCart[existingItemIndex].quantity < 10) {
          updatedCart[existingItemIndex].quantity += 1;
          Alert.alert("Success", "Product quantity increased in cart!");
        } else {
          Alert.alert(
            "Limit Reached",
            "Maximum quantity (10) reached for this product."
          );
          return;
        }
      } else {
        const newCartItem: CartItem = {
          product,
          quantity: 1,
        };
        updatedCart = [...cart, newCartItem];
        Alert.alert("Success", "Product added to cart!");
      }

      setCart(updatedCart);
      await saveCart(updatedCart);
    } catch (error) {
      Alert.alert("Error", "Failed to add product to cart.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  listContent: {
    padding: 15,
  },
});
