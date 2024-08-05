import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseUrl = 'https://legpzytiaeepvlgmekfk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZ3B6eXRpYWVlcHZsZ21la2ZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NzQyMDI4NiwiZXhwIjoxOTcyOTk2Mjg2fQ.e0PJY19wBY5OvM68UwFtxp7S3kqCMXnT4wWK6n-PrG0';

export const supabase = createClient(supabaseUrl, supabaseKey);
