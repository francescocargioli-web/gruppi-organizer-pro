// netlify/functions/get-data.js
const supabase = require('./supabase-client');

exports.handler = async function(event, context) {
  try {
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('event_name, config_data');

    if (eventsError) throw eventsError;

    const { data: registrations, error: regsError } = await supabase
      .from('registrations')
      .select('*');

    if (regsError) throw regsError;

    // Trasforma l'array di eventi in un oggetto, come si aspettava il codice originale
    const eventsObject = events.reduce((acc, event) => {
        acc[event.event_name] = event.config_data;
        return acc;
    }, {});

    return {
      statusCode: 200,
      body: JSON.stringify({ events: eventsObject, registrations }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
