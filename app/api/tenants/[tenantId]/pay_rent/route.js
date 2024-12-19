import supabase from '../../../../../lib/subabase';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  // Extract tenantId from dynamic route
  const { tenantId } = params;

  console.log("backendtenantId:", tenantId);

  try {
    // Parse incoming payment data
    const paymentData = await req.json();
    console.log("Payment Data:", paymentData);

    const {
      room_id,
      owner_id,
      property_id,
      rent_payment,
      month,
      payment_mode,
      transaction_id,
      total_due_left,
      total_payment,
      created_at,
    } = paymentData;

    const updated_at = new Date().toISOString();

    // Insert payment data into the database
    const { data, error } = await supabase
      .from('rentpayment')
      .insert([
        {
          tenant_id: tenantId, // Ensure tenantId is correctly used
          room_id,
          owner_id,
          property_id,
          rent_payment,
          month,
          total_due_left,
          total_payment,
          payment_mode,
          transaction_id,
          
        },
      ])
      .select(); // Return the inserted data for confirmation

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ message: "Failed to process rent payment.", error }, { status: 500 });
    }

    // Return the inserted payment data
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error.", error }, { status: 500 });
  }
}
