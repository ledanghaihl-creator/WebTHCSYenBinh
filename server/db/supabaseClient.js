import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienpvY3RjYWJxY3ZhenZqamdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAyMjg3OSwiZXhwIjoyMTAxNTk4ODc5fQ.B9AP63XBmMx6b1DPjj18lblFvSiDHFjCjE37Frouu6U';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseReady = () => Boolean(supabaseUrl && supabaseKey);
