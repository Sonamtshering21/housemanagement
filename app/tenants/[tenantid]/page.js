'use client'
import { useState, useEffect } from 'react';
import styles from './tenantsid.module.css'

const TenantRentDetails = ({ tenantId }) => {
  const [rentData, setRentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);  // New state for form submission loading
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    rent_payment: '',
    month: '',
    payment_mode: '',
    transaction_id: ''
  });

  useEffect(() => {
    // Fetch rent data for the specific tenantId passed in the props
    const tenantId=1;
    const fetchRentData = async () => {
      setLoading(true);  // Set loading to true when fetching data
      try {
        const response = await fetch(`/api/tenants/${tenantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rent payments');
        }
        const data = await response.json();
        setRentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Set loading to false after the fetch is done
      }
    };

    fetchRentData();
  }, [tenantId]);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Set submit loading to true when the form is submitted
    setSubmitLoading(true);

    const tenantId = 1;

    // Assuming tenantId and other payment details are available
    const currentMonth = new Date().getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextMonthName = new Date(new Date().setMonth(nextMonth - 1)).toLocaleString('default', { month: 'long' });

    const rent = rentData[0]; // Access the first rent entry (can adjust based on the tenant you're processing)

    const ownerId = rent?.owner_id; // Extract owner_id
    const roomId = rent?.room_id; // Extract room_id
    const propertyId = rent?.property_id; // Extract property_id

    // Ensure that `roomId`, `ownerId`, and `propertyId` are valid before proceeding
    if (!roomId || !ownerId || !propertyId) {
      setError('Missing required data to process payment');
      setSubmitLoading(false);  // Set submit loading to false if error occurs
      return;
    }

    const paymentData = {
      tenant_id: tenantId,
      room_id: roomId,
      owner_id: ownerId,
      property_id: propertyId,
      rent_payment: paymentDetails.rent_payment,
      month: nextMonthName,
      payment_mode: paymentDetails.payment_mode,
      transaction_id: paymentDetails.transaction_id,
      total_due_left: rentData[0]?.total_due_left - paymentDetails.rent_payment,
      total_payment:
        parseFloat(rentData[0]?.total_payment || 0) +
        parseFloat(paymentDetails.rent_payment),
    };

    try {
      const response = await fetch(`/api/tenants/${tenantId}/pay_rent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Failed to process rent payment');
      }

      const data = await response.json();
      // Add new payment data to rentData
      setRentData((prevData) => [...prevData, data]);
      // Reset form
      setPaymentDetails({
        rent_payment: '',
        month: '',
        payment_mode: '',
        transaction_id: ''
      });

      // After successful payment submission, re-fetch the data to update the table
      const fetchRentData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/tenants/${tenantId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch rent payments');
          }
          const data = await response.json();
          setRentData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchRentData(); // Fetch updated data

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false); // Set submit loading to false when the form submission is finished
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
     <div className={styles.rentsystem}>
      <h2>Tenant Rent Payment Details</h2>
      {rentData && rentData.length > 0 ? (
        <div className={styles.tenantstable}>
          {/* Display Tenant and House Owner Info */}
          <p>Welcome to  tenants protal, <span><em>{rentData[0].tenants.tenant_name}</em></span></p>
          <div className={styles.insidetenants}>

          <div >
            
            <p><strong>Contact:</strong> {rentData[0].tenants.contact_no}</p>
            <p><strong>Email:</strong> {rentData[0].tenants.email}</p>
            <p><strong>Lease Start Date:</strong> {new Date(rentData[0].tenants.lease_start_date).toLocaleDateString()}</p>
            <p><strong>Lease End Date:</strong> {new Date(rentData[0].tenants.lease_end_date).toLocaleDateString()}</p>
            <h3>House Information</h3>
            <p><strong>Room Number:</strong> {rentData[0].rooms.room_number}</p>
            <p><strong>Floor Number:</strong> {rentData[0].rooms.floor_number}</p>
            <p><strong>Room Type:</strong> {rentData[0].rooms.room_type}</p>
            <p><strong>Room Description:</strong> {rentData[0].rooms.description}</p>
            <p><strong>Facilities:</strong> {rentData[0].rooms.facilities}</p>
            <p><strong>Status:</strong> {rentData[0].rooms.status}</p>
          </div>
          <div className={styles.secondbox}>
            <h1>Payemnt details</h1>
            <p>Due Left: 0</p>
            <button>Feedback</button>
            
          </div>
          </div>

          {/* Display Rent Payments Info */}
          <h3>Payment Details</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Rent Payment</th>
                <th>Month</th>
                <th>Payment Mode</th>
                <th>Transaction ID</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {rentData.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>Nu: {payment.rent_payment}</td>
                  <td>{payment.month}</td>
                  <td>{payment.payment_mode}</td>
                  <td>{payment.transaction_id}</td>
                  <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Rent Payment Form for the Next Month */}
          <h3>Pay Rent for Next Month</h3>
          <form onSubmit={handlePaymentSubmit}>
            <div>
              <label htmlFor="rent_payment">Rent Payment Amount:</label>
              <input
                type="number"
                id="rent_payment"
                name="rent_payment"
                value={paymentDetails.rent_payment}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="payment_mode">Payment Mode:</label>
              <select
                id="payment_mode"
                name="payment_mode"
                value={paymentDetails.payment_mode}
                onChange={handleChange}
                required
              >
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <div>
              <label htmlFor="transaction_id">Transaction ID:</label>
              <input
                type="text"
                id="transaction_id"
                name="transaction_id"
                value={paymentDetails.transaction_id}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" disabled={submitLoading}>
              {submitLoading ? 'Submitting...' : 'Pay Rent'}
            </button>
          </form>
        </div>
      ) : (
        <p>No rent payments found for this tenant.</p>
      )}
    </div>
  );
};

export default TenantRentDetails;
