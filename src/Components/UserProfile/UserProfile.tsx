import React, { useState } from 'react';
import './UserProfile.css'; // Import the CSS for this component
import { initialUserData } from './UserProfileData.tsx'; // Import initialUserData from the data file

const UserProfile = () => {
  // State for user data, initialized from the imported data
  const [userData, setUserData] = useState(initialUserData);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('User Profile Saved:', userData);
    // Here you would typically send this data to a backend
    // Example: await api.updateUserProfile(userData);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="profile-avatar-wrapper">
            <img src={userData.profileImage} alt="User Avatar" className="profile-user-avatar" />
            {/* Edit Avatar Button */}
            <button className="edit-avatar-button">
              <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="form-fields-grid">
          {/* Your Name */}
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">Your Name</label>
            <input
              type="text"
              id="firstName"
              className="text-input"
              value={userData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>
          {/* User Name */}
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">User Name</label>
            <input
              type="text"
              id="lastName"
              className="text-input"
              value={userData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="text-input"
              value={userData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="text-input"
              value={userData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
          {/* Date of Birth */}
          <div className="input-group">
            <label htmlFor="dob" className="input-label">Date of Birth</label>
            <input
              type="text" // Could be type="date" for a date picker
              id="dob"
              className="text-input"
              value={userData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          </div>
          {/* Present Address */}
          <div className="input-group">
            <label htmlFor="presentAddress" className="input-label">Present Address</label>
            <input
              type="text"
              id="presentAddress"
              className="text-input"
              value={userData.presentAddress}
              onChange={(e) => handleInputChange('presentAddress', e.target.value)}
            />
          </div>
          {/* Permanent Address */}
          <div className="input-group">
            <label htmlFor="permanentAddress" className="input-label">Permanent Address</label>
            <input
              type="text"
              id="permanentAddress"
              className="text-input"
              value={userData.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
            />
          </div>
          {/* City */}
          <div className="input-group">
            <label htmlFor="city" className="input-label">City</label>
            <input
              type="text"
              id="city"
              className="text-input"
              value={userData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          {/* Postal Code */}
          <div className="input-group">
            <label htmlFor="postalCode" className="input-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              className="text-input"
              value={userData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
            />
          </div>
          {/* Country */}
          <div className="input-group">
            <label htmlFor="country" className="input-label">Country</label>
            <input
              type="text"
              id="country"
              className="text-input"
              value={userData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="save-button-wrapper">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
