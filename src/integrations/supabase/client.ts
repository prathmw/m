import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nvdpqlnurtymzuuxwoqn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iFIq8Coazm-fqwxvZaraog_7g9SxLRW";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
