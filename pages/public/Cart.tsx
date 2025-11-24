import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import Meta from '../../components/Meta';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.salePrice || item.price) * item.quantity, 0);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Meta title="Shopping Cart" />
      <h1 className="text-3xl font-bold font-heading mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="text-[color:var(--color-primary)] font-bold hover:underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${(item.salePrice || item.price) * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-4 border-b pb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-[color:var(--color-primary)] text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;