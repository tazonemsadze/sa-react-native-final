import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchUser } from "../services/api";
import { LoginFormData, User } from "../types";
import { saveLoginState, saveRememberMe, saveUser } from "../utils/storage";
import { loginSchema } from "../utils/validationSchemas";

export const LoginScreen = ({ navigation, onLoginSuccess }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [testUser, setTestUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    loadTestUser();
  }, []);

  const loadTestUser = async () => {
    try {
      setLoadingUser(true);
      const user = await fetchUser(1);
      setTestUser(user);
      setValue("email", user.email);
      setValue("password", "test123");
    } catch (error) {
      console.error("Failed to load test user");
    } finally {
      setLoadingUser(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    if (
      testUser &&
      data.email === testUser.email &&
      data.password === "test123"
    ) {
      const newUser: User = {
        id: testUser.id.toString(),
        fullName: `${testUser.name.firstname} ${testUser.name.lastname}`,
        email: testUser.email,
        address: `${testUser.address.street}, ${testUser.address.city}`,
        imageUri: "",
      };

      await saveUser(newUser);
      await saveLoginState(true);
      await saveRememberMe(data.rememberMe);

      Alert.alert("Success", "Login successful!");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      Alert.alert(
        "Error",
        "Invalid email or password. Please use the test credentials shown above."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          {loadingUser ? (
            <View style={styles.testCredentials}>
              <ActivityIndicator size="small" color="#007AFF" />
              <Text style={styles.loadingText}>
                Loading test credentials...
              </Text>
            </View>
          ) : testUser ? (
            <View style={styles.testCredentials}>
              <Text style={styles.testTitle}>🔑 Test Credentials:</Text>
              <Text style={styles.testText}>Email: {testUser.email}</Text>
              <Text style={styles.testText}>Password: test123</Text>
            </View>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                )}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.rememberContainer}>
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => onChange(!value)}
                >
                  <View
                    style={[styles.checkbox, value && styles.checkboxChecked]}
                  >
                    {value && (
                      <Ionicons name="checkmark" size={18} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  testCredentials: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  testText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  testNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 5,
  },
  rememberContainer: {
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#666",
  },
  registerLink: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});
