import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const totalPrice = item.product.price * item.quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)} each</Text>
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

        <View style={styles.controls}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={onDecrease}
              disabled={item.quantity <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={onIncrease}
              disabled={item.quantity >= 10}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    backgroundColor: "#007AFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
