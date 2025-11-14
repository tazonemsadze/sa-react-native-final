// User type for auth
export interface User {
  id: string;
  fullName: string;
  email: string;
  address: string;
  imageUri?: string;
}

// Product dta type
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart item type (pr + qq)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Login forme data
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Register form data tpes
export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  imageUri?: string;
}
