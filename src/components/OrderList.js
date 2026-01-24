import React, { useState, useEffect } from 'react';
import { getOrders, getProducts, createOrder, updateOrder, deleteOrder } from '../services/api';
import OrderForm from './OrderForm';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getOrders();
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load products');
    }
  };

  const handleAddOrder = async (orderData) => {
    try {
      await createOrder(orderData);
      setSuccessMessage('Order created successfully');
      setShowForm(false);
      fetchOrders();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to create order');
    }
  };

  const handleUpdateOrder = async (id, orderData) => {
    try {
      await updateOrder(id, orderData);
      setSuccessMessage('Order updated successfully');
      setEditingOrder(null);
      fetchOrders();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update order');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        setSuccessMessage('Order deleted successfully');
        fetchOrders();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Failed to delete order');
      }
    }
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 animate-slideIn">
        <h2 className="section-title">Orders</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingOrder(null);
          }}
          className="btn-success"
        >
          + New Order
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {(showForm || editingOrder) && (
        <div className="card p-6 mb-6 animate-slideIn">
          <OrderForm
            order={editingOrder}
            products={products}
            onSubmit={editingOrder ? (data) => handleUpdateOrder(editingOrder.id, data) : handleAddOrder}
            onCancel={() => {
              setShowForm(false);
              setEditingOrder(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading orders...</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Order #</th>
                <th className="px-6 py-3 text-left font-semibold">Product</th>
                <th className="px-6 py-3 text-left font-semibold">Qty</th>
                <th className="px-6 py-3 text-left font-semibold">Total Price</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Customer</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800 font-semibold">{order.orderNumber}</td>
                  <td className="px-6 py-3 text-gray-600">{getProductName(order.product.id)}</td>
                  <td className="px-6 py-3 text-gray-600">{order.quantity}</td>
                  <td className="px-6 py-3 text-gray-600">${order.totalPrice}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'ORDERED' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => setEditingOrder(order)}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="btn-danger text-sm px-3 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
