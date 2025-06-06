import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js'; // Import type only

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
