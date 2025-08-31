// netlify/functions/save-event.js
const supabase = require('./supabase-client');

exports.handler = async function(event, context) {
  try {
    const eventData = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('events')
      .upsert({ 
          event_name: eventData.eventName, 
          config_data: eventData 
        }, { onConflict: 'event_name' });

    if (error) throw error;

    return { statusCode: 200, body: JSON.stringify({ message: "Evento salvato!" }) };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
