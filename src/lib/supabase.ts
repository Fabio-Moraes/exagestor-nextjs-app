import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseUrl = 'https://legpzytiaeepvlgmekfk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZ3B6eXRpYWVlcHZsZ21la2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc0MjAyODYsImV4cCI6MTk3Mjk5NjI4Nn0.4lJRduYsSTX2LrjzhFBTLCGbNiwjReWijO7tkPgyItA';

export const supabase = createClient(supabaseUrl, supabaseKey);
