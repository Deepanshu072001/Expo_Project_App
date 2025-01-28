import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xyarcdomuazaksawgtkq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5YXJjZG9tdWF6YWtzYXdndGtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODI0NDgsImV4cCI6MjA1MzQ1ODQ0OH0.O9FmUTkMk1EADsuZK074CKnvUaKtGDhxNzCsNxwQCk4";

export const supabase = createClient(supabaseUrl, supabaseKey);