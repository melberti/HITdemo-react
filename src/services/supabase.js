import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nsribrvbkekkkanclndt.supabase.co/";
export const imageBaseUrl = `${supabaseUrl}storage/v1/object/public/`
export const eventImageBaseUrl = `${imageBaseUrl}eventImages/`
const supabaseKey = import.meta.env.VITE_SUPABASE_HIT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;