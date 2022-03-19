/* eslint-disable react/jsx-filename-extension */

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthProvider from "./context/AuthContext/AuthProvider";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/tasks"
            element={(
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
