import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import { MockDB } from '../../services/mockDb';
import { Order } from '../../types';
import Meta from '../../components/Meta';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: 'Badmintas Road', // Default per requirements example, user can change
    city: '',
    phone: '',
  });
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        customerName: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        items: cart,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      MockDB.createOrder(newOrder);
      clearCart();
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Meta title="Order Received" />
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
          <i className="fa-solid fa-check text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold font-heading mb-4">Thank you! Your order has been received.</h1>
        <p className="text-gray-600 mb-8">We will send a confirmation to your email shortly.</p>
        <button onClick={() => navigate('/')} className="text-[color:var(--color-primary)] font-bold hover:underline">
          Return to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-[color:var(--color-primary)]">Shop Now</button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Meta title="Checkout" />
      <h1 className="text-3xl font-bold font-heading mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input required type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input required type="email" className="mt-1 w-full border border-gray-300 rounded-md p-2" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input required type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" placeholder="Example: Badmintas Road"
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input required type="text" className="mt-1 w-full border border-gray-300 rounded-md p-2" 
                  value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input required type="tel" className="mt-1 w-full border border-gray-300 rounded-md p-2" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
          </form>

          <h2 className="text-xl font-bold mt-8 mb-6">Payment Method</h2>
          <div className="p-4 border rounded-md bg-gray-50 flex items-center gap-3">
             <i className="fa-regular fa-credit-card"></i>
             <span>Credit Card (Stripe Simulation)</span>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x {item.quantity}</span>
                <span>${((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button form="checkout-form" type="submit" className="w-full bg-[color:var(--color-primary)] text-white py-3 rounded-lg font-bold hover:opacity-90">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;