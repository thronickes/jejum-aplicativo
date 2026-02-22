import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oihgudanzfcomyfdltvh.supabase.co';
const supabaseKey = 'sb_publishable_snBLZaPf4cmsGaGuwc8wSw_Yc1s9NQi';

export const supabase = createClient(supabaseUrl, supabaseKey);
