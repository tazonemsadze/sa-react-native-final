

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
  const { cart, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } =
    useCart();

  useFocusEffect(
    React.useCallback(() => {
    }, [])
  );

  const handleIncrease = async (item: any) => {
    try {
      await updateQuantity(item.product.id, item.quantity + 1);
    } catch {
      Alert.alert("Error", "Failed to update quantity.");
    }
  };

  const handleDecrease = async (item: any) => {
    try {
      if (item.quantity === 1) {
        Alert.alert(
          "Remove Item",
          "Do you want to remove this item from cart?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Remove",
              style: "destructive",
              onPress: () => handleRemove(item),
            },
          ]
        );
      } else {
        await updateQuantity(item.product.id, item.quantity - 1);
      }
    } catch {
      Alert.alert("Error", "Failed to update quantity.");
    }
  };

  const handleRemove = async (item: any) => {
    try {
      await removeFromCart(item.product.id);
      Alert.alert("Success", "Item removed from cart.");
    } catch {
      Alert.alert("Error", "Failed to remove item.");
    }
  };

  const renderCartItem = ({ item }: any) => (
    <CartItem
      item={item}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onRemove={handleRemove}
    />
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#CCC" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>Add some products to get started!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerSubtitle}>
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
        </Text>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item: any) => item.product.id.toString()}
        contentContainerStyle={[
          styles.listContent,
          cart.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={renderEmptyCart}
        showsVerticalScrollIndicator={false}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              Alert.alert("Success", "Checkout feature coming soon!")
            }
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContent: {
    padding: 15,
    paddingBottom: 100,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default CartScreen;
