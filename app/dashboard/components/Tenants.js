'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles/tenants.module.css';
import { useSession } from 'next-auth/react';
const AddRoom = () => {
  const {data: session }= useSession();
  const userId=session?.user?.id;
  const [properties, setProperties]=useState();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rooms, setRooms] = useState();
  
  const [formData, setFormData]=useState({
    room_number:'',
    floor_number:'',
    room_type:'',
    description:'',
    facilities:'',
    status:'',
    });
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  const handleSubmit =async(e)=>{
    e.preventDefault();
    const roomData ={
      owner_id: selectedProperty.owner_id,   // Automatically pass owner_id
      property_id: selectedProperty.property_id,  // Automatically pass property_id
      room_number: formData.room_number,
      floor_number: formData.floor_number,
      room_type: formData.room_type,
      description: formData.description,
      facilities: formData.facilities,
      status: formData.status,
      
    };
    console.log(roomData)
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        alert('Property submitted successfully!');
        setFormData({
          owner_id:'',
          property_id:'',
          room_number:'',
          floor_number:'',
          room_type:'',
          description:'',
          facilities:'',
          status:'',
        });
      } else {
        alert('Failed to submit property.');
      }
    } catch (error) {
      console.error('Error submitting property:', error);
      alert('An error occurred.');
    }
  
  }
  const handlePropertyClick = (property) => {
    setSelectedProperty(property);

  };

 
   useEffect(()=>{
      const fetchProperties = async()=>{
        if(userId){
          try{
            const response = await fetch(`/api/properties/${userId}`);
            const data=await response.json();
            if(response.ok){
              setProperties(data);
            }else{
              console.error('Failed to fetch properties:',data.message);
              
            }
          }catch(error){
            console.error('error fetching properties', error);
          }
        }
      };
      fetchProperties();
    },[userId]);

    useEffect(() => {
      const fetchRooms = async () => {
        if (userId && selectedProperty) {
          try {
            const response = await fetch(`/api/rooms/${userId}/${selectedProperty.property_id}`);
            const data = await response.json();
    
            if (response.ok) {
              setRooms(data);
            } else {
              console.error('Failed to fetch rooms:', data.message);
            }
          } catch (error) {
            console.error('Error fetching rooms:', error);
          }
        }
      };
    
      fetchRooms();
    }, [userId, selectedProperty]); // Include selectedProperty in the dependencies
    

    useEffect(() => {
      if (selectedProperty) {
      }
    }, [selectedProperty]); 

  return (
    <div className={styles.rooms}>
      
      <div className={styles.propertyList}>
        {properties && properties.length === 0 ? (
          <p>No Properties found. Add the Propery</p>
        ) : (
          <>
            <h2>Select the Properties to look for the room Details</h2>
          <ul>
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <li
                  key={property.id}
                  className={styles.propertyItem}
                  onClick={() => handlePropertyClick(property)}
                  style={{ cursor: 'pointer' }} // Make it visually clear that the items are clickable
                >
                  <h3>{property.property_name}</h3>
                  <img src={property.photolink} alt="Property" />
                  <p>{property.description}</p>
                  <p>{property.location}</p>
                </li>
              ))
            ) : (
              <p>Loading properties...</p>
            )}
          </ul></>
        )}
      </div>
      {selectedProperty && (
        <div className={styles.propertyDetails}>
        <h2>Property Details</h2>
        <table className={styles.propertyTable}>
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Total Rooms</th>
              <th>Facilities</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedProperty.property_name}</td>
              <td>{selectedProperty.description}</td>
              <td>{selectedProperty.location}</td>
              <td>{selectedProperty.total_rooms}</td>
              <td>{selectedProperty.facilities}</td>
              
            </tr>
          </tbody>
        </table>      
          <h2>Property rooms</h2>
          <div className={styles.roomlist}>
              {rooms && rooms.length === 0 ? (
                <p>No rooms found. Add the Room</p>
              ) : (
                <table className={styles.propertyTable}>
                  <thead>
                    <tr>
                      <th>Room Number</th>
                      <th>Floor Number</th>
                      <th>Room Type</th>
                      <th>Description</th>
                      <th>Facilities</th>
                      <th>Status</th>
                      <th>Tenant Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms && rooms.length > 0 ? (
                      rooms.map((roomsdetails) => (
                        <tr key={roomsdetails.id}>
                          <td>{roomsdetails.room_number}</td>
                          <td>{roomsdetails.floor_number}</td>
                          <td>{roomsdetails.room_type}</td>
                          <td>{roomsdetails.description}</td>
                          <td>{roomsdetails.facilities}</td>
                          <td>{roomsdetails.status}</td>
                          <td>
                            {roomsdetails.tenants && roomsdetails.tenants.length > 0 ? (
                              roomsdetails.tenants.map((tenant) => (
                                <div key={tenant.id} style={{ marginBottom: '1rem' }}>
                                  <p>Name: {tenant.tenant_name}</p>
                                  <p>Contact: {tenant.contact_no}</p>
                                  <p>Email: {tenant.email}</p>
                                  <p>Lease Start: {tenant.lease_start_date}</p>
                                  <p>Lease End: {tenant.lease_end_date}</p>
                                </div>
                              ))
                            ) : (
                              <p>No tenant assigned to this room.</p>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">Loading rooms...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

          <h2>Add room in Property</h2>
          <div className={styles.roomsdetails}>
            <form onSubmit ={handleSubmit}>
            <label>Enter room no:</label>
            <input
              type='number'
              name='room_number'
              value={formData.room_number}
              onChange={handleChange}
              placeholder='Room no'
            />
            <label>Enter floor no:</label>
            <input
              type='number'
              name='floor_number'
              value={formData.floor_number}
              onChange={handleChange}
              placeholder='floor no'
            />
            <label>Enter room type:</label>
            <input
              type='text'
              name='room_type'
              value={formData.room_type}
              onChange={handleChange}
              placeholder='room type'
            />
            <label>Enter description:</label>
            <input
              type='text'
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='description'
            />
            <label>Enter facilities:</label>
            <input
              type='text'
              name='facilities'
              value={formData.facilities}
              onChange={handleChange}
              placeholder='facilities'
            />
            <label>Enter status:</label>
            <input
              type='text'
              name='status'
              value={formData.status}
              onChange={handleChange}
              placeholder='status'
            />
            <button type="submit">Submit</button>
            </form>
          </div>
          <button onClick={() => setSelectedProperty(null)}>Close</button>
        </div>
      )}

      
    </div>
  );
};

export default AddRoom;
