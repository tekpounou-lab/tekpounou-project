import React from 'react'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// TODO: Create a ResetPasswordPage if you want a real implementation
function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <p className="text-gray-600 text-sm text-center">
          Password reset form goes here.
        </p>
      </div>
    </div>
  )
}

interface AuthPageProps {
  type: 'login' | 'register' | 'reset'
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  if (type === 'login') return <LoginPage />
  if (type === 'register') return <RegisterPage />
  if (type === 'reset') return <ResetPasswordPage />

  // fallback in case type is invalid
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Invalid auth route</p>
    </div>
  )
}

export default AuthPage
