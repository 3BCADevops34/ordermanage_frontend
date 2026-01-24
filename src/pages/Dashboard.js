import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import OrderList from '../components/OrderList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'products' && <ProductList />}
          {activeTab === 'orders' && <OrderList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
