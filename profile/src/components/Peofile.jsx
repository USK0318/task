import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaEnvelope, FaPhone, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';  // Import axios for HTTP requests
import './Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch profile data from API
  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then((response) => {
        const profile = response.data[0]; // Assuming the response data is an array
        setProfileData({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          bio: profile.bio,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching profile data');
        setLoading(false);
      });
  }, []); // Empty dependency array to run once when the component mounts

  // Handle input changes while editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      // If switching to "Save", make the API call to update the profile data
      axios.post('http://localhost:3000/profile/6758850527997ac742b258a2', profileData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          setSuccessMessage('Profile updated successfully!');
          setIsEditing(false);
        })
        .catch((err) => {
          console.error('Error saving profile data:', err.response || err);
          setError('Error saving profile data');
        });
    } else {
      setIsEditing(true);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;  // Show loading text
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}  {/* Success message */}
      <div className="profile-card">
        <div className="profile-field">
          <FaUserEdit className="profile-icon" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <p className="profile-text">{profileData.name}</p>
          )}
        </div>
        <div className="profile-field">
          <FaEnvelope className="profile-icon" />
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <p className="profile-text">{profileData.email}</p>
          )}
        </div>
        <div className="profile-field">
          <FaPhone className="profile-icon" />
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="profile-input"
            />
          ) : (
            <p className="profile-text">{profileData.phone}</p>
          )}
        </div>
        <div className="profile-field">
          <FaInfoCircle className="profile-icon" />
          {isEditing ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="profile-textarea"
            />
          ) : (
            <p className="profile-text">{profileData.bio}</p>
          )}
        </div>
        <button className="profile-edit-btn" onClick={toggleEdit}>
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
}

export default Profile;
