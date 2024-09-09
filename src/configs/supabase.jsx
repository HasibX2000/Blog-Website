// File: supabaseClient.js
// This file initializes and exports a Supabase client for interacting with the Supabase database.

import { createClient } from "@supabase/supabase-js";

// Retrieve Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // URL for Supabase instance
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Anon key for accessing Supabase

// Create a Supabase client instance with the URL and key
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client instance for use in other parts of the application
export default supabase;
