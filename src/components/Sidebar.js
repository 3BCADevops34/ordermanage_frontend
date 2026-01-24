import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
      <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <h1 className="text-2xl font-bold">SW Traders 🎉</h1>
        <p className="text-gray-200 text-sm mt-2">Hardwares to Inspire you!</p>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`w-full text-left px-4 py-3 rounded-lg transition transform hover:scale-105 ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          📦 Products
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`w-full text-left px-4 py-3 rounded-lg transition transform hover:scale-105 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          📋 Orders
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
