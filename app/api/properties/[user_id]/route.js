import supabase from '../../../../lib/subabase';
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  const { user_id } = params; // Extract user_id from dynamic route

  if (!user_id || isNaN(Number(user_id))) {
    return NextResponse.json(
      { error: 'Invalid or missing user_id' },
      { status: 400 }
    );
  }

  try {
    const { data: properties, error: fetchError } = await supabase
      .from('properties')
      .select('*') // Fetch all columns
      .eq('owner_id', Number(user_id))

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      );
    }

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
