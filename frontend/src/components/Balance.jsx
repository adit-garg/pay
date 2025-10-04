import  { useState } from 'react';


import { Eye, EyeOff, ArrowUpRight, Plus } from 'lucide-react';
export const Balance = ({ value, loading }) => {
  const [showBalance, setShowBalance] = useState(true);
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium">Your Balance</p>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-2xl font-bold">
              {loading ? '₹ ---.--' : showBalance ? `₹ ${value}` : '₹ ****'}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-blue-100 hover:text-white transition-colors"
            >
              {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-colors">
            <Plus className="h-5 w-5" />
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-2 transition-colors">
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};