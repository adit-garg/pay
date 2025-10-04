import { Button } from "./Button"

export const SuccessModal = ({ isOpen, onClose, amount, recipientName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Successful!</h2>
        <p className="text-gray-600 mb-6">₹{amount} sent to {recipientName}</p>
        <Button
          label="Close"
          onClick={onClose}
          variant="primary"
        />
      </div>
    </div>
  );
};