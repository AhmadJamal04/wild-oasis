import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ngcnmikizbbofyizolyp.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nY25taWtpemJib2Z5aXpvbHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MTc2OTYsImV4cCI6MjAyOTI5MzY5Nn0.BlZI9B4OWSZdavoFS6K1TP-1Nslt5ovDxrI86OIrqOw";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
