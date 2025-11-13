# 🛍️ React Native Shopping App

A full-featured mobile shopping application built with React Native and Expo. This app demonstrates authentication, product listing, cart management, and user profiles with persistent storage.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📱 What Does This App Do?

This is a shopping app where you can:
- **Login** or create a new account
- **Browse products** from a real API
- **Add items to cart** with quantity controls (max 10 per item)
- **View your cart** and see the total price
- **Manage your profile** and logout

Everything is saved on your phone, so your cart and login status persist even after you close the app!

## ✨ Features

### 🔐 Authentication
- **Login Screen** with email, password, and "remember me" checkbox
- **Registration Screen** with form validation
- **Password visibility toggle** (show/hide password)
- **Image picker** for profile photo (requires camera permission)
- **Location-based address** input (requires location permission)
- **Test credentials** auto-filled from FakeStore API for easy testing

### 🛒 Shopping Experience
- **Product listing** from [FakeStore API](https://fakestoreapi.com/)
- **Add to cart** with smart duplicate detection
- **Cart badge** showing total items count
- **Quantity controls** (increase/decrease with +/- buttons)
- **Max quantity limit** of 10 items per product
- **Total price calculation** with per-item breakdown
- **Remove items** from cart with confirmation
- **Clear cart** option to remove all items

### 👤 User Profile
- **Profile page** showing user information
- **Logout** functionality with confirmation dialog
- **Persistent login** state using AsyncStorage

### 🎨 UI/UX
- **Tab navigation** for easy switching between Products, Cart, and Profile
- **Stack navigation** for Login/Register flow
- **Loading states** for better user experience
- **Error handling** with user-friendly alerts
- **Clean, modern design** with iOS-style components

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library (Stack + Tab navigators)
- **React Hook Form** - Form state management
- **Yup** - Form validation
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API calls
- **Expo Image Picker** - Camera/gallery access
- **Expo Location** - GPS location services

## 📁 Project Structure
```
sa-react-native-final/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout configuration
│   └── index.tsx                # Entry point
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CartItem.tsx         # Cart item component
│   │   └── ProductCard.tsx      # Product card component
│   ├── navigation/              # Navigation setup
│   │   └── AppNavigator.tsx     # Main navigation configuration
│   ├── screens/                 # App screens
│   │   ├── CartScreen.tsx       # Shopping cart
│   │   ├── LoginScreen.tsx      # Login page
│   │   ├── ProductsScreen.tsx   # Product listing
│   │   ├── ProfileScreen.tsx    # User profile
│   │   └── RegisterScreen.tsx   # Registration page
│   ├── services/                # API services
│   │   └── api.ts               # FakeStore API calls
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # Type definitions
│   └── utils/                   # Utility functions
│       ├── storage.ts           # AsyncStorage helpers
│       └── validationSchemas.ts # Yup validation schemas
├── assets/                      # Images and assets
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

You need to have these installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on your phone (for testing)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/tazonemsadze/sa-react-native-final.git
   cd sa-react-native-final
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npx expo start
```

4. **Run on your device**
   - **iPhone:** Scan the QR code with your Camera app
   - **Android:** Scan the QR code with the Expo Go app
   - **Web:** Press `w` to open in browser (limited functionality)

## 🧪 Testing the App

### Login Credentials

The app fetches a test user from FakeStore API. The credentials are auto-filled on the login screen:

- **Email:** (shown on login screen)
- **Password:** `test123`

Just tap the "Login" button to test the app!

### Testing Registration

1. Tap "Register here" on login screen
2. Fill in the form (all fields are validated)
3. Tap "Add Photo" to test image picker (requires permission)
4. Tap "Use My Location" to test location feature (requires permission)
5. Tap "Register" to create account

## 📖 How It Works

### Data Persistence

The app uses **AsyncStorage** to save data on your device:
- **Login state** - Remembers if you're logged in
- **User data** - Stores your profile information
- **Cart items** - Saves your shopping cart
- **Remember me** - Keeps you logged in between sessions

### Navigation Flow
```
App Starts
    ↓
Check AsyncStorage for login state
    ↓
    ├─→ Not logged in? → Show Login Screen
    │                    └─→ Can navigate to Register Screen
    └─→ Logged in? → Show Main App (Tab Navigator)
                     └─→ Products / Cart / Profile tabs
```

### Cart Logic

When you add a product:
1. **Checks** if product already exists in cart
2. **If exists:** Increases quantity by 1 (max 10)
3. **If new:** Adds product with quantity 1
4. **Saves** to AsyncStorage for persistence

### Form Validation

Uses **Yup** schemas for validation:
- **Email:** Must be valid email format
- **Password:** Minimum 6 characters
- **Full Name:** Minimum 3 characters
- **Address:** Minimum 5 characters
- **Confirm Password:** Must match password field

## 🔑 Key Concepts Explained

### Why AsyncStorage?

Think of AsyncStorage like a small database on your phone. Without it:
- You'd lose your cart when closing the app ❌
- You'd need to login every time ❌

With AsyncStorage:
- Your cart persists ✅
- You stay logged in ✅
- Data survives app restarts ✅

### Why React Navigation?

The app uses two types of navigators:

**Stack Navigator** (Login → Register):
- Screens stack on top of each other
- Has a back button
- Used for temporary flows

**Tab Navigator** (Products, Cart, Profile):
- Bottom tabs for quick switching
- Used for main app sections
- Always accessible

### Why React Hook Form + Yup?

Instead of managing form state manually, these libraries:
- Handle form state automatically ✅
- Validate inputs with clear rules ✅
- Show error messages ✅
- Reduce code by ~70% ✅

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Make sure you installed all dependencies
```bash
npm install
```

### Issue: Camera/Location not working
**Solution:** These features require device permissions. On first use, the app will ask for permission. If denied, go to your phone settings → app permissions.

### Issue: Products not loading
**Solution:** Make sure you have internet connection. The app fetches products from https://fakestoreapi.com/

### Issue: App crashes on Android
**Solution:** Try clearing cache and restarting
```bash
npx expo start -c
```

## 📚 Learning Resources

If you're new to these technologies:

- **React Native:** [Official Docs](https://reactnative.dev/docs/getting-started)
- **Expo:** [Expo Documentation](https://docs.expo.dev/)
- **React Navigation:** [Navigation Guide](https://reactnavigation.org/docs/getting-started)
- **TypeScript:** [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **React Hook Form:** [Hook Form Docs](https://react-hook-form.com/)

## 🤝 Contributing

This is a student project, but suggestions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Git Commit History

This project was built incrementally with meaningful commits:

1. **Initial Setup** - Project structure and dependencies
2. **Authentication** - Login and registration screens
3. **Product Listing** - Products screen and components
4. **Cart & Profile** - Cart management and user profile
5. **Final Polish** - Callbacks, badges, and UI improvements

## 📄 License

This project is for educational purposes. Feel free to use it for learning!

## 👨‍💻 Author

Built with ❤️ by a React Native learner

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing free product data
- [Expo](https://expo.dev/) for making React Native development easier
- [React Native Community](https://reactnative.dev/community/overview) for amazing libraries



