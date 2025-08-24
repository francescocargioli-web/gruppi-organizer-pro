// netlify/functions/supabase-client.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Esporta un client Supabase inizializzato
module.exports = createClient(supabaseUrl, supabaseKey);
