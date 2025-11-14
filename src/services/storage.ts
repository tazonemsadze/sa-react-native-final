import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@user";
const CART_KEY = "@cart";
const REMEMBER_ME_KEY = "@rememberMe";

export const saveUser = async (user: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.log("Error saving user:", error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log("Error getting user:", error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(REMEMBER_ME_KEY);
    return true;
  } catch (error) {
    console.log("Error removing user:", error);
    return false;
  }
};

export const saveRememberMe = async (remember: boolean) => {
  try {
    await AsyncStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(remember));
    return true;
  } catch (error) {
    console.log("Error saving remember me:", error);
    return false;
  }
};

export const getRememberMe = async () => {
  try {
    const remember = await AsyncStorage.getItem(REMEMBER_ME_KEY);
    return remember ? JSON.parse(remember) : false;
  } catch (error) {
    console.log("Error getting remember me:", error);
    return false;
  }
};

export const saveCart = async (cart: any[]) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log("Error saving cart:", error);
    return false;
  }
};

export const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.log("Error getting cart:", error);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
    return true;
  } catch (error) {
    console.log("Error clearing cart:", error);
    return false;
  }
};
