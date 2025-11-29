import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
