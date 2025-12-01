import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignIn from "./pages/SignIn";

import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
