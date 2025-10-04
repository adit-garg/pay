import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { SendMoneyModal } from "../components/SendMoneyModal"
import { SuccessModal } from "../components/SuccessModal"
import { Users } from "../components/Users"
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [transferDetails, setTransferDetails] = useState({ amount: '', name: '' });
  const [currentPage, setCurrentPage] = useState('dashboard');

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCurrentPage('signin');
        return;
      }

      // Fetch balance
      const balanceResponse = await fetch('http://localhost:3000/api/v1/account/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!balanceResponse.ok) throw new Error('Failed to fetch balance');
      const balanceData = await balanceResponse.json();
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        localStorage.removeItem('token');
        setCurrentPage('signin');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentPage('signin');
  };

  const handleSendMoney = (recipient) => {
    setSelectedRecipient(recipient);
    setShowSendModal(true);
  };

  const handleTransferSuccess = (amount, recipientName) => {
    setTransferDetails({ amount, name: recipientName });
    setShowSuccessModal(true);
    fetchDashboardData(); // Refresh balance
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (currentPage === 'signin') {
    return <Signin onSuccess={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'signup') {
    return <Signup onSuccess={() => setCurrentPage('dashboard')} onSwitchToSignin={() => setCurrentPage('signin')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar user={user} onLogout={handleLogout} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Balance value={balance.toLocaleString()} loading={loading} />
          <Users onSendMoney={handleSendMoney} />
        </div>
      </div>

      <SendMoneyModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        recipient={selectedRecipient}
        onSuccess={handleTransferSuccess}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        amount={transferDetails.amount}
        recipientName={transferDetails.name}
      />
    </div>
  );
};