

import { NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigatorContent = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ onLogin }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{ onLogin }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <NavigationIndependentTree>
      <AuthNavigatorContent onLogin={onLogin} />
    </NavigationIndependentTree>
  );
};

export default AuthNavigator;
