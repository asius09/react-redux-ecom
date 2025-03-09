import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PasswordManager = () => {
  const isDarkMode = useSelector((state) => state.theme?.theme === "dark");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Here you would typically call an API to update the password
    // For demo purposes, we'll just show a success message
    setSuccess('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
            Current Password
          </label>
          <input 
            type="password" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
            } border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
            New Password
          </label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
            } border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-1`}>
            Confirm New Password
          </label>
          <input 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
            } border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>
        
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordManager;