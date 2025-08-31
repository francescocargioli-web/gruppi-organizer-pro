// netlify/functions/add-registration.js
const supabase = require('./supabase-client');

exports.handler = async function(event, context) {
    try {
        const registrationsToAdd = JSON.parse(event.body);

        const { data, error } = await supabase
            .from('registrations')
            .insert(registrationsToAdd);

        if (error) throw error;

        return { statusCode: 200, body: JSON.stringify({ message: "Iscrizione salvata!" }) };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
