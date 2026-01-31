import React, { useState } from 'react';

 const OrderForm = ({ order, products, onSubmit, onCancel }) => {
 const  [formData, setFormData] = useState(order || {
    orderNumber: '',
    product: { id: '' },
    quantity: '',
    totalPrice: '',
    status: 'ORDERED',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'productId') {
      const selectedProduct = products.find(p => p.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        product: { id: parseInt(value) },
        totalPrice: selectedProduct ? (selectedProduct.price * (prev.quantity || 1)).toFixed(2) : ''
      }));
    } else if (name === 'quantity') {
      const qty = parseInt(value) || 0;
      const selectedProduct = products.find(p => p.id === formData.product.id);
      setFormData(prev => ({
        ...prev,
        quantity: qty,
        totalPrice: selectedProduct ? (selectedProduct.price * qty).toFixed(2) : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {order ? 'Edit Order' : 'Create New Order'}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Product *</label>
          <select
            name="productId"
            value={formData.product.id || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (${product.price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="ORDERED">Ordered</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Total Price</label>
          <input
            type="number"
            step="0.01"
            name="totalPrice"
            value={formData.totalPrice}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Customer Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            placeholder="Enter customer email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Customer Phone</label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            placeholder="Enter customer phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {order ? 'Update Order' : 'Create Order'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
