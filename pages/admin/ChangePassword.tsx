import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../App';
import { MockDB } from '../../services/mockDb';
import Meta from '../../components/Meta';

const ChangePassword: React.FC = () => {
  const { user, login } = useAppContext();
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updatedUser = { ...user, passwordHash: newPassword, requiresPasswordChange: false };
      MockDB.updateUser(updatedUser);
      login(updatedUser); // Update context
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Meta title="Change Password" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Security Alert</h1>
        <p className="mb-6 text-center text-gray-600">You must change your default password before continuing.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="w-full border p-2 rounded" 
              placeholder="Enter new strong password"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;