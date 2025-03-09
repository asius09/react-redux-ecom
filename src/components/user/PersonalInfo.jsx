import React, { useState } from "react";

const PersonalInfo = ({ userData, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location || "Not specified"
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // Here you would typically save the data to your backend
    // For now, we'll just toggle the editing state
    setIsEditing(false);
  };
  
  const renderField = (label, field, type = "text") => (
    <div className="flex flex-col gap-1">
      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</span>
      {isEditing ? (
        <input
          type={type}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`px-3 py-2 rounded-lg ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
          } border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
        />
      ) : (
        <span className="font-medium">{formData[field]}</span>
      )}
    </div>
  );
  
  return (
    <div
      className={`rounded-xl p-6 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Personal Information</h2>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 relative group">
          <img
            src={userData.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="text-white bg-indigo-500 hover:bg-indigo-600 p-2 rounded-full"
            >
              <i className="ri-camera-line"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {renderField("Full Name", "name")}
          {renderField("Email Address", "email", "email")}
          {renderField("Phone Number", "phone", "tel")}
          {renderField("Location", "location")}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isDarkMode
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white transition-colors`}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
