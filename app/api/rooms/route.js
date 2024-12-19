import supabase from '../../../lib/subabase';
import { NextResponse } from 'next/server';

// Add a room
export async function POST(req) {
  try {
    const { owner_id, property_id,room_number,floor_number,room_type, description, facilities, status } = await req.json();

    // Validate required field
    

    // Insert a new room into the rooms table
    const { error } = await supabase.from('rooms').insert([
      {
        owner_id: owner_id,
        property_id: property_id,
        room_number: room_number,
        floor_number: floor_number,
        room_type: room_type,
        description: description || null,
        facilities: facilities || null,
        status: status || 'available',
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ message: "Failed to add room." }, { status: 500 });
    }

    return NextResponse.json({ message: "Room added successfully." }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

