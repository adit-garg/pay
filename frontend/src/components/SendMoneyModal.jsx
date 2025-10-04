import { Button } from "./Button"
import { InputBox } from "./InputBox"
import  { useState } from 'react';

export const SendMoneyModal = ({ isOpen, onClose, recipient, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/account/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          to: recipient._id,
          amount: parseFloat(amount)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Transfer failed');
      }

      onSuccess(amount, recipient.firstName);
      onClose();
      setAmount('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Send Money</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-white">{recipient?.firstName?.[0]?.toUpperCase()}</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{recipient?.firstName} {recipient?.lastName}</p>
            <p className="text-sm text-gray-500">{recipient?.username}</p>
          </div>
        </div>

        <div className="space-y-4">
          <InputBox
            label="Amount (₹)"
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={error}
          />

          <div className="flex space-x-3">
            <Button
              label="Cancel"
              onClick={onClose}
              variant="secondary"
            />
            <Button
              label="Send Money"
              onClick={handleTransfer}
              disabled={!amount || loading}
              loading={loading}
              variant="success"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
