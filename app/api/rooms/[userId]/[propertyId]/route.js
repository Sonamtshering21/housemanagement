import supabase from '../../../../../lib/subabase'
import { NextResponse } from 'next/server';

// Fetch all rooms
export async function GET(req, { params }) {
    const { userId, propertyId } = params; // Extract userId and propertyId from dynamic route

    try {
        // Query the database based on userId and propertyId
        const { data, error } = await supabase
  .from('rooms')
  .select(`
    id,
    owner_id,
    property_id,
    room_number,
    floor_number,
    room_type,
    description,
    facilities,
    status,
    created_at,
    tenants (
      id,
      tenant_name,
      contact_no,
      email,
      lease_start_date,
      lease_end_date,
      security_deposit
    )
  `)
  .eq('owner_id', userId)
  .eq('property_id', propertyId);





        if (error) {
            console.error("Fetch error:", error);
            return NextResponse.json({ message: "Failed to fetch rooms." }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
}
  