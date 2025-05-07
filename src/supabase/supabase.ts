import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldgiqdejtmcecnybswit.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZ2lxZGVqdG1jZWNueWJzd2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc2OTQsImV4cCI6MjA2MTI1MzY5NH0.JEkoyd3ZQUcFKuexRqOAtbw6Mv1aT2CPafdApxqwz0Y';
export const supabase = createClient(supabaseUrl, supabaseKey);
