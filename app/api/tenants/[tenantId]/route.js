
import supabase from '../../../../lib/subabase'
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { tenantId } = params; // Extract tenantId from dynamic route
   
    // Check if tenantId is present and is a valid number
   console.log(tenantId)
    try {
      const { data, error } = await supabase
        .from('rentpayment')
        .select(`
          id,
          tenant_id,
          room_id,
          owner_id,
          property_id,
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
        .eq('tenant_id', tenantId); // Filter by tenant_id directly in rentpayment
    
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
