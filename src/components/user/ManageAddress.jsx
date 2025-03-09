import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ManageAddress = ({ isDarkMode }) => {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
    { id: 2, type: 'Work', street: '456 Park Ave', city: 'New York', state: 'NY', zip: '10022', isDefault: false }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  return (
    <div className={`rounded-xl p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Addresses</h2>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={() => {
            setCurrentAddress({ id: Date.now(), type: '', street: '', city: '', state: '', zip: '', isDefault: false });
            setIsEditing(true);
          }}
        >
          Add New Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div 
            key={address.id} 
            className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${
              address.isDefault ? (isDarkMode ? "bg-gray-700" : "bg-blue-50") : ""
            }`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold">{address.type}</span>
                  {address.isDefault && (
                    <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-blue-700" : "bg-blue-100"}`}>
                      Default
                    </span>
                  )}
                </div>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zip}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(address)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(address.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                {!address.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(address.id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Address form modal would go here */}
    </div>
  );
};

export default ManageAddress;