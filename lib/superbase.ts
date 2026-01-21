import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://wydajmnykbvjicgnncqz.supabase.co";
const supabase_key = "sb_publishable_q5fpXlJ2UUoHGBikJ4aybA_LbvWQP2Q";
const user_id = "kp_339dafa063a841ccb41f03df8aa1055f"; //consider this as the shop id for the products to be shown on the site
const DB = createClient(supabase_url, supabase_key);

export const SHOP_ID = user_id;
export default DB;
