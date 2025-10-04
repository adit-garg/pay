import { useEffect, useState } from "react"
import { UserCard } from "./UserCard"
import { User, Search} from 'lucide-react';
export const Users = ({ onSendMoney }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.user || []);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers(filter);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filter]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Send Money</h2>
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-3 p-3">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No users found</p>
            </div>
          ) : (
            users.map((user) => <UserCard key={user._id} user={user} onSendMoney={onSendMoney} />)
          )}
        </div>
      )}
    </div>
  );
};