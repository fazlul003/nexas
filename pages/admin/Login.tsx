import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../App';
import { MockDB } from '../../services/mockDb';
import Meta from '../../components/Meta';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@site.com');
  const [password, setPassword] = useState('possward321@');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MockDB.findUser(email);

    if (user && user.passwordHash === password) {
      login(user);
      if (user.requiresPasswordChange) {
        navigate('/admin/change-password');
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Meta title="Admin Login" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h1>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
             <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
             <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="flex justify-between text-sm">
            <Link to="/" className="text-gray-500 hover:text-black">Back to Store</Link>
            <span className="text-blue-600 cursor-pointer">Forgot Password?</span>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;