import supabase from '../../../../../lib/subabase'
import { NextResponse } from 'next/server';
export async function GET(req, { params }) {
    const { userId, propertyId } = params; // Extract userId and propertyId from dynamic route
  
    try {
      const { data, error } = await supabase
      .from('rentpayment')
      .select(`
        id,
        rent_payment,
        month,
        total_due_left,
        total_payment,
        payment_mode,
        transaction_id,
        created_at,
        tenants:tenant_id (
          tenant_name,
          contact_no,
          email,
          lease_start_date,
          lease_end_date
        ),
        rooms:room_id (
          room_number,
          floor_number,
          room_type,
          description,
          facilities,
          status
        )
      `)
      .eq('owner_id', userId) // Filter by owner_id directly in rentpayment
      .eq('property_id', propertyId); // Filter by property_id directly in rentpayment
 
      if (error) {
        console.error('Error fetching rent payments:', error);
        return NextResponse.json({ message: 'Failed to fetch rent payments.' }, { status: 500 });
      }
  
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Server error.' }, { status: 500 });
    }
  }