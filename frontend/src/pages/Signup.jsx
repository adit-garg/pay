import { useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { Wallet } from 'lucide-react';


export const Signup = ({ onSuccess, onSwitchToSignin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      localStorage.setItem('token', data.token);
      onSuccess?.();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Wallet className="h-12 w-12 text-blue-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600">Join PayTM today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputBox
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange('firstName')}
            />
            <InputBox
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange('lastName')}
            />
          </div>
          
          <InputBox
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={formData.username}
            onChange={handleChange('username')}
          />
          
          <InputBox
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
          />

          <Button
            label="Sign Up"
            onClick={handleSubmit}
            loading={loading}
            disabled={!formData.firstName || !formData.lastName || !formData.username || !formData.password}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
