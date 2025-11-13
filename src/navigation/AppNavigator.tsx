import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { CartScreen } from "../screens/CartScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

import { CartItem } from "../types";
import { getCart, getLoginState } from "../utils/storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Create Account" }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = ({ onLogout }: { onLogout: () => void }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();

    const interval = setInterval(() => {
      loadCartCount();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadCartCount = async () => {
    const cart = await getCart();
    const totalItems = cart.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );
    setCartCount(totalItems);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Products") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          if (route.name === "Cart" && cartCount > 0) {
            return (
              <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={size} color={color} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </Text>
                </View>
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: "Products" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Shopping Cart",
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen name="Profile" options={{ title: "My Profile" }}>
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginState();
  }, []);

  const checkLoginState = async () => {
    try {
      const loggedIn = await getLoginState();
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error("Error checking login state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return isLoggedIn ? (
    <MainTabs onLogout={handleLogout} />
  ) : (
    <AuthStack onLoginSuccess={handleLoginSuccess} />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  iconContainer: {
    width: 24,
    height: 24,
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -4,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
