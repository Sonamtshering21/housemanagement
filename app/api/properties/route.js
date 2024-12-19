
import supabase from '../../../lib/subabase'
import { NextResponse } from "next/server";

// Your random image URLs can be stored here.


  
  export async function POST(req) {
    try {
      // Parse the request body to extract property details and user_id
      const { propertyName, photoLink, totalRooms, description, facilities, location, user_id } = await req.json();
  
      // Check for required fields
      if (!propertyName || !description || !location || !user_id) {
        return NextResponse.json({ message: "Required fields are missing." }, { status: 400 });
      }
  
      // Select a random image URL

  
      // Insert into Supabase and include the owner_id (user_id)
      const { data: newProperty, error } = await supabase
        .from('properties')
        .insert([{
          property_name: propertyName,
          photolink: photoLink, // Use the randomly selected image link
          total_rooms: totalRooms || null,
          description,
          facilities,
          location,
          owner_id: user_id, // Insert owner_id using the user_id parameter
        }])
        .single(); // Use `.single()` to get the inserted property data
  
      if (error) {
        console.error("Insert error:", error);
        return NextResponse.json({ message: "Failed to add property." }, { status: 500 });
      }
  
      // Return the newly added property
      return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.json({ message: "Server error." }, { status: 500 });
    }
  }
  