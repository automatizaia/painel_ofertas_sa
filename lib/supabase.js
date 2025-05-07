import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://jlggruubpbywznhdziqc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ2dydXVicGJ5d3puaGR6aXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzA2NjksImV4cCI6MjA1OTgwNjY2OX0.5dyep3OjnsTn2I1HY8g--u5znYzPyvHvFbBPBR_CAvE'
);
