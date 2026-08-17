import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nsribrvbkekkkanclndt.supabase.co/rest/v1/";
const supabaseKey = import.meta.env.VITE_SUPABASE_HIT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;