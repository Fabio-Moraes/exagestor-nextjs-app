import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, imageUrl } = await request.json();

    const { data, error } = await supabase
      .from('exagestor')
      .update({ image_url: imageUrl })
      .eq('id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
