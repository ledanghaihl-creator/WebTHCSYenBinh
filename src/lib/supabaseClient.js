import { createClient } from '@supabase/supabase-js';

// Official Supabase Credentials for THCS Yên Bình Portal
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ibzzoctcabqcvazvjjge.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlienpvY3RjYWJxY3ZhenZqamdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMjI4NzksImV4cCI6MjEwMTU5ODg3OX0.mkTnNMpOW4wUsrHkrz2QaWCeDZKmU06OUp670b_TIP4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);
