import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
