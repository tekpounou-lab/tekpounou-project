import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Temporary Reset Password page (replace with real form later)
function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Password reset form goes here.
        </p>
      </div>
    </div>
  );
}

const AuthPage: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />

      {/* fallback for invalid auth route */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Invalid auth route</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AuthPage;
