import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User, Check } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onSignUp: (userData: { name: string; email: string; password: string }) => void;
}

export default function RegisterScreen({ onBack, onSignUp }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verificationEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setIsLoading(false);
    }, 1500);
  };

  const isFormValid = formData.name && formData.email && formData.password && formData.verificationEmail;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <div className="w-12"></div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join EmoFelix</h2>
            <p className="text-gray-600">Create your account to start connecting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Verify Email Address"
                  value={formData.verificationEmail}
                  onChange={(e) => setFormData({ ...formData, verificationEmail: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-gray-900 font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}