import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ofkpyrwvmjuqxvrxitpm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ma3B5cnd2bWp1cXh2cnhpdHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjk0MDYsImV4cCI6MjA4OTgwNTQwNn0.m5pmOKuEUgXdJ_cc8JM6RYIpUV2A-nGB20rW_u-PT1o"
);
