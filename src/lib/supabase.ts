
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fjrpauyhifdfvxchggsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcnBhdXloaWZkZnZ4Y2hnZ3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTYwMzMsImV4cCI6MjA1NzY5MjAzM30.DglT8NhrkQSquWbD5XWFcO4Or89TU47G9JTODIFWJX0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
