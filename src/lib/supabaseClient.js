import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvibudxbmzxfvxwuwwnb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aWJ1ZHhibXp4ZnZ4d3V3d25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjEwMDIsImV4cCI6MjA5MjMzNzAwMn0.t-JzaOrLM_lgzYTrqFbqeW9ofZ-gc3cvFYzdI9N5utI";

export const supabase = createClient(supabaseUrl, supabaseKey);