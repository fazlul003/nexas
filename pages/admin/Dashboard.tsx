import React, { useEffect, useState } from 'react';
import { MockDB } from '../../services/mockDb';
import { Order, Product } from '../../types';
import Meta from '../../components/Meta';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setOrders(MockDB.getOrders());
    setProducts(MockDB.getProducts());
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div>
      <Meta title="Admin Dashboard" />
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-500 text-sm">Total Revenue</div>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">Total Orders</div>
          <div className="text-2xl font-bold">{orders.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm">Products</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-500 text-sm">Pending Orders</div>
          <div className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-gray-500">No orders yet.</td></tr>
              ) : (
                orders.slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td className="p-4 font-mono text-sm">{order.id}</td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 font-bold">${order.total.toFixed(2)}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;