import React from "react-icons";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

import CartScreen from "./CartScreen";
import SigninScreen from "./Screens/SigninScreen";
import ShippingAdressScreen from "./Screens/ShippingAdressScreen";
import SignupScreen from "./Screens/SignupScreen ";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOderScreen from "./Screens/PlaceOderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import SearchScreen from "./Screens/SearchScreen";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardScreen from "./Screens/DashboardScreen";
import AdminRoute from "./Components/AdminRoute";
import UserEditScreen from "../src/Screens/UserEditScreen";
import ProductEditScreen from "../src/Screens/ProductEditScreen";
import ProductListScreen from "../src/Screens/ProductListScreen";
import UserListScreen from "../src/Screens/UserListScreen";
import OrderListScreen from "../src/Screens/OrderListScreen";
import MapScreen from "../src/Screens/MapScreen";
import Footer from "./Screens/Footer";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import NavBar from "./NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/product/:slug" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/placeorder" element={<PlaceOderScreen />} />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/shipping" element={<ShippingAdressScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderListScreen />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserListScreen />
            </AdminRoute>
          }
        />
        <Route path="/admin/products" element={<ProductListScreen />} />
        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <ProductEditScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <AdminRoute>
              <UserEditScreen />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/map"
          element={
            <ProtectedRoute>
              <MapScreen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orderhistory"
          element={
            <ProtectedRoute>
              <OrderHistoryScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
