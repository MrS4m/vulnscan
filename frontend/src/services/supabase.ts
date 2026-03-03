import { createClient } from '@supabase/supabase-js';

// No mundo real, essas variáveis vêm do .env
// Ex: import.meta.env.VITE_SUPABASE_URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'sua_url_do_supabase';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua_anon_key_do_supabase';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
