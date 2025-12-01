import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
