'use client'
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from 'react'
import styles from './styles/rentpayment.module.css'

const Rentpayment = () => {
  const { data: session } = useSession();
  const userId= session?.user?.id;
  const [properties, setProperties]=useState();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [rentpayments, setRentpayments]=useState();
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
            const fetchRentpayments = async () => {
              if (userId && selectedProperty) {
                try {
                  const response = await fetch(`/api/rentpayments/${userId}/${selectedProperty.property_id}`);
                  const data = await response.json();
          
                  if (response.ok) {
                    setRentpayments(data);
                  } else {
                    console.error('Failed to fetch rooms:', data.message);
                  }
                } catch (error) {
                  console.error('Error fetching rooms:', error);
                }
              }
            };
          
            fetchRentpayments();
          }, [userId, selectedProperty]); // Include selectedProperty in the dependencies
          console.log(rentpayments)
  return (
    <div className={styles.rentpayment}>
      <h1>Rent payments</h1>
      <div>Select the Properties to look for the room details</div>
      <div className={styles.propertyList}>
        {properties && properties.length === 0 ? (
          <p>No Properties found.</p>
        ) : (
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
          </ul>
        )}
      </div>
      <div className={styles.innerdisplay}>
      {selectedProperty && (
        <div className={styles.propertyDetails}>
        <h2>Property & Rent payments Details</h2>
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
          <div className={styles.roomlist}>
            {rentpayments && rentpayments.length === 0 ? (
              <p>No rent payments found.</p>
            ) : (
              <table className={styles.rentTable}>
                <thead>
                  <tr>
                    <th>Room Number</th>
                    <th>Floor Number</th>                 
                    <th>Tenant Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Rent Payment</th>
                    <th>Month</th>
                    <th>Total Due Left</th>
                    <th>Total Payment</th>
                    <th>Payment Mode</th>
                    <th>Transaction ID</th>
                    
             
                  </tr>
                </thead>
                <tbody>
                  {rentpayments &&
                    rentpayments.map((roomsdetails) => (
                      <tr key={roomsdetails.id}>
                        <td>{roomsdetails.rooms?.room_number || "N/A"}</td>
                        <td>{roomsdetails.rooms?.floor_number || "N/A"}</td>
                        <td>{roomsdetails.tenants?.tenant_name || "N/A"}</td>
                        <td>{roomsdetails.tenants?.contact_no || "N/A"}</td>
                        <td>{roomsdetails.tenants?.email || "N/A"}</td>
                        <td>{roomsdetails.rent_payment}</td>
                        <td>{roomsdetails.month}</td>
                        <td>{roomsdetails.total_due_left}</td>
                        <td>{roomsdetails.total_payment}</td>
                        <td>{roomsdetails.payment_mode || "N/A"}</td>
                        <td>{roomsdetails.transaction_id || "N/A"}</td>
                       
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}
      </div>

     
    </div>
  )
}

export default Rentpayment;