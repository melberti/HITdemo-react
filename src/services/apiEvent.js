import supabase from "./supabase";

export async function getEventsCurrent(){

  const controller = new AbortController();


let { data, error } = await supabase
 .from('event')
  .select(`
    id, title, description, eventDate, eventStartTime, eventEndTime, cost, imageUrl,
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
    else{
    console.error(error);
    throw new Error("Settings could not be loaded");
    }
  }

  return data;
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