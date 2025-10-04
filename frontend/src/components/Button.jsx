

export const Button = ({ label, onClick, variant = 'primary', disabled = false, loading = false, className = '' }) => {
  const baseClasses = "w-full font-medium rounded-lg text-sm px-5 py-2.5 transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-300"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
          Loading...
        </div>
      ) : (
        label
      )}
    </button>
  );
};
  