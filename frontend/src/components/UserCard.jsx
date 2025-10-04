import {  Send } from 'lucide-react';

export const UserCard = ({ user, onSendMoney }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user.firstName?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>
      </div>
      <button
        onClick={() => onSendMoney(user)}
        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
      >
        <Send className="h-4 w-4" />
        <span>Send</span>
      </button>
    </div>
  );
};