'use client';

import React, { useState, useEffect } from 'react';
import styles from '../addpropertycomponents/styles/houserent.module.css';
import { useSession } from 'next-auth/react';

const Houseforrent = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    propertyName: '',
    photoLink: null,
    totalRooms: '',
    description: '',
    facilities: '',
    location: '',
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photoLink') {
      setFormData({ ...formData, [name]: files[0] }); // Handle single file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let uploadedImageUrl = null;

      // If an image is selected, upload it to the Cloudinary backend first
      if (formData.photoLink) {
        const fileData = new FormData();
        fileData.append('file', formData.photoLink);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image.');
        }

        const uploadResult = await uploadResponse.json();
        uploadedImageUrl = uploadResult.url;
      }

      // Prepare property data with uploaded image URL
      const propertyData = {
        propertyName: formData.propertyName,
        photoLink: uploadedImageUrl,
        totalRooms: formData.totalRooms,
        description: formData.description,
        facilities: formData.facilities,
        location: formData.location,
        user_id: userId,
      };

      // Submit the property data
      const response = await fetch('/api/properties', {
        method: 'POST',
        body: JSON.stringify(propertyData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit property.');
      }

      alert('Property submitted successfully!');
      setFormData({
        propertyName: '',
        photoLink: null,
        totalRooms: '',
        description: '',
        facilities: '',
        location: '',
      });

      // Refresh properties list
      fetchProperties();
    } catch (error) {
      console.error('Error:', error.message);
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchProperties = async () => {
    if (userId) {
      try {
        const response = await fetch(`/api/properties/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setProperties(data);
        } else {
          console.error('Failed to fetch properties:', data.message);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [userId]);

  return (
    <div className={styles.houseforrent}>
      <div className={styles.propertyList}>
        <h2>All Properties</h2>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <ul>
            {properties.map((property) => (
              <li key={property.id} className={styles.propertyItem}>
                <h3>{property.property_name}</h3>
                {property.photolink && <img src={property.photolink} alt="Property" />}
                <p>Total Room: {property.total_rooms}</p>
                <p>{property.description}</p>
                <p>{property.facilities}</p>
                <p>{property.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.Forminput}>
        <h2>Add Your Property</h2>
        <form onSubmit={handleSubmit}>
          <label>Enter the Property Name:</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Property Name"
          />

          <label>Upload Image:</label>
          <input
            type="file"
            name="photoLink"
            accept="image/*"
            onChange={handleChange}
          />

          <label>Total Rooms:</label>
          <input
            type="number"
            name="totalRooms"
            value={formData.totalRooms}
            onChange={handleChange}
            placeholder="Total Rooms"
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Property Description"
            rows="4"
          />

          <label>Facilities:</label>
          <textarea
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            placeholder="Facilities (e.g., Wi-Fi, Pool)"
            rows="2"
          />

          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
        </div>
    </div>
  );
};

export default Houseforrent;
