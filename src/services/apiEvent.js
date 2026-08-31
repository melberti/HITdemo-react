import supabase from "./supabase";

export async function getEventsCurrent() {

  const controller = new AbortController();

  let { data, error } = await supabase
    .from('event')
    .select(`
    id, title, description, eventDate, eventStartTime, eventEndTime, cost, imageUrl, isPostponed, isCancelled,
    venue (
      id, name, city, state
    ),
    category (
    id, value)
  `).order('eventDate, eventStartTime', { ascending: true }) // Newest first
    .abortSignal(controller.signal); // Bind the signal

  //not sure I need to use this controller signal just yet
  //currently filtering on records returned rather than filtering on query

  if (error) {
    if (error.message.includes('aborted')) {
      console.log('Request was canceled');
    }
    else {
      console.error(error);
      throw new Error("Settings could not be loaded");
    }
  }

  return data;
}


export async function getMyEvents() {

  const { data: { user } } = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from('event')
    .select(`
    id, title, description, eventDate, eventStartTime, eventEndTime, cost, imageUrl, isPostponed, isCancelled,
    venue (
      id, name, city, state
    ),
    category (
    id, value)
    `)
    .eq('userId', user.id)
    .order('eventDate, eventStartTime', { ascending: true }) // Soonest first

  if (error) {
    throw new Error(error);
  }

  return data;
}



export async function addEvent({
  title,
  description,
  eventDate,
  eventStartTime,
  eventEndTime,
  imageUrl,
  categoryId,
  venueId,
  eventUrl,
  cost,
}) {



  //if we didn't throw an error, keep going
  //create the event
  const { data, error: eventError } = await supabase
    .from('event')
    .insert({
      title,
      description,
      eventDate,
      eventStartTime,
      eventEndTime,
      imageUrl,
      categoryId,
      venueId,
      eventUrl,
      cost,
    })
    .select()

  if (eventError) {
    console.error(eventError);
    throw new Error("Event not created");
  }

}


export async function postDateEvents() {

  const { error } = await supabase.rpc('move_out_event_date');

  if (error) {
    throw new Error("Unable to move out event dates");
  }

}


// let { data: event, error } = await supabase
//   .from('event')
//   .select('*')

// Read specific columns
// let { data: event, error } = await supabase
//   .from('event')
//   .select('some_column,other_column')

// Read referenced tables
// let { data: event, error } = await supabase
//   .from('event')
//   .select(`
//     some_column,
//     other_table (
//       foreign_key
//     )
//   `)

// With pagination
// let { data: event, error } = await supabase
//   .from('event')
//   .select('*')
//   .range(0, 9)


// With filtering
// let { data: event, error } = await supabase
//   .from('event')
//   .select("*")

//   // Filters
//   .eq('column', 'Equal to')
//   .gt('column', 'Greater than')
//   .lt('column', 'Less than')
//   .gte('column', 'Greater than or equal to')
//   .lte('column', 'Less than or equal to')
//   .like('column', '%CaseSensitive%')
//   .ilike('column', '%CaseInsensitive%')
//   .is('column', null)
//   .in('column', ['Array', 'Values'])
//   .neq('column', 'Not equal to')

//   // Arrays
//   .contains('array_column', ['array', 'contains'])
//   .containedBy('array_column', ['contained', 'by'])

//   // Logical operators
//   .not('column', 'like', 'Negate filter')
//   .or('some_column.eq.Some value, other_column.eq.Other value')