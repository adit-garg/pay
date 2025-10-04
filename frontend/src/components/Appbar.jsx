import { LogOut, Wallet } from 'lucide-react';
import { useState } from 'react';

export const Appbar = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Wallet className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">PayTM</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Hello, <span className="font-semibold text-gray-900">{user?.firstName || 'User'}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      onLogout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};