import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CartProvider } from "../src/context/CartContext";
import AppNavigator from "../src/navigation/AppNavigator";
import AuthNavigator from "../src/navigation/AuthNavigator";
import { getUser } from "../src/services/storage";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await getUser();
      setIsLoggedIn(user ? true : false);
    } catch (error) {
      console.log("Error checking login status:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoading || isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const content = isLoggedIn ? (
    <AppNavigator onLogout={handleLogout} />
  ) : (
    <AuthNavigator onLogin={handleLogin} />
  );

  return <CartProvider>{content}</CartProvider>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
