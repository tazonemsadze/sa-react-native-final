import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, User } from "../types";

const KEYS = {
  USER: "@user",
  CART: "@cart",
  REMEMBER_ME: "@rememberMe",
  IS_LOGGED_IN: "@isLoggedIn",
};

export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

export const saveLoginState = async (isLoggedIn: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.IS_LOGGED_IN, JSON.stringify(isLoggedIn));
  } catch (error) {
    console.error("Error saving login state:", error);
  }
};

export const getLoginState = async (): Promise<boolean> => {
  try {
    const loginState = await AsyncStorage.getItem(KEYS.IS_LOGGED_IN);
    return loginState ? JSON.parse(loginState) : false;
  } catch (error) {
    console.error("Error getting login state:", error);
    return false;
  }
};

export const saveRememberMe = async (remember: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.REMEMBER_ME, JSON.stringify(remember));
  } catch (error) {
    console.error("Error saving remember me:", error);
  }
};

export const getRememberMe = async (): Promise<boolean> => {
  try {
    const rememberMe = await AsyncStorage.getItem(KEYS.REMEMBER_ME);
    return rememberMe ? JSON.parse(rememberMe) : false;
  } catch (error) {
    console.error("Error getting remember me:", error);
    return false;
  }
};

export const saveCart = async (cart: CartItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.CART, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const getCart = async (): Promise<CartItem[]> => {
  try {
    const cartData = await AsyncStorage.getItem(KEYS.CART);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error getting cart:", error);
    return [];
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.USER,
      KEYS.IS_LOGGED_IN,
      KEYS.REMEMBER_ME,
    ]);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
