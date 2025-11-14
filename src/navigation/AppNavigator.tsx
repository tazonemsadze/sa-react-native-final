

import { Ionicons } from "@expo/vector-icons";
import { NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Products Stack Navigator (includes ProductDetails)
const ProductsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator with Bottom Tabs
const AppNavigatorContent = ({ onLogout }: { onLogout: () => void }) => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === "Products") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          const icon = <Ionicons name={iconName} size={size} color={color} />;

          // Add badge for cart
          if (route.name === "Cart" && cartCount > 0) {
            return (
              <View style={{ position: "relative" }}>
                {icon}
                <View
                  style={{
                    position: "absolute",
                    right: -8,
                    top: -8,
                    backgroundColor: "#FF3B30",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 12 }}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              </View>
            );
          }

          return icon;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarLabel: "Cart" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ onLogout }}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <NavigationIndependentTree>
      <AppNavigatorContent onLogout={onLogout} />
    </NavigationIndependentTree>
  );
};

export default AppNavigator;
