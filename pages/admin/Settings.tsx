import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';
import { MockDB } from '../../services/mockDb';
import { SiteSettings } from '../../types';
import Meta from '../../components/Meta';

const Settings: React.FC = () => {
  const { settings, refreshSettings } = useAppContext();
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    MockDB.updateSettings(formData);
    refreshSettings();
    setMsg('Settings saved successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <Meta title="Site Settings" />
      <h1 className="text-2xl font-bold mb-8">Website Settings</h1>
      
      {msg && <div className="bg-green-100 text-green-700 p-3 rounded mb-6">{msg}</div>}

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">General Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input type="text" className="w-full border p-2 rounded" 
                value={formData.siteName} onChange={e => setFormData({...formData, siteName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Store Address</label>
              <input type="text" className="w-full border p-2 rounded" 
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium mb-1">Support Email</label>
              <input type="email" className="w-full border p-2 rounded" 
                value={formData.supportEmail} onChange={e => setFormData({...formData, supportEmail: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Appearance & Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input type="color" className="h-10 w-20 p-1 border rounded" 
                  value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} />
                <span className="text-sm text-gray-500">{formData.primaryColor}</span>
              </div>
            </div>
            {/* Live Preview Block */}
            <div className="p-4 border border-dashed rounded bg-gray-50">
              <p className="text-xs text-gray-500 mb-2">Button Preview</p>
              <button type="button" style={{ backgroundColor: formData.primaryColor }} className="text-white px-4 py-2 rounded">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Homepage Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Homepage Text</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero Title</label>
              <input type="text" className="w-full border p-2 rounded" 
                value={formData.homepageHeroTitle} onChange={e => setFormData({...formData, homepageHeroTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Subtext</label>
              <textarea className="w-full border p-2 rounded" 
                value={formData.homepageHeroSubtext} onChange={e => setFormData({...formData, homepageHeroSubtext: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Maintenance */}
         <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Maintenance Mode</h2>
              <p className="text-sm text-gray-500">Enable this to hide the storefront from customers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={formData.maintenanceMode} 
                onChange={e => setFormData({...formData, maintenanceMode: e.target.checked})} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-12">
           <button type="button" className="px-6 py-3 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200">Clear Cache</button>
           <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 shadow-lg">Save Settings</button>
        </div>

      </form>
    </div>
  );
};

export default Settings;