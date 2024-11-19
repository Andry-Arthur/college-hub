import { createClient } from '@supabase/supabase-js'

const URL = 'https://rkqkaknmgcsgwqcqwhpw.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcWtha25tZ2NzZ3dxY3F3aHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5ODM3MTgsImV4cCI6MjA0NzU1OTcxOH0.6ykRit0YJXeeXSlOXwt-IpPUGY6KLy7pld4N6RO6F0I';

export const supabase = createClient(URL, API_KEY);
