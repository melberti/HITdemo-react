import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

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
  image,
  categoryId,
  venueId,
  eventUrl,
  cost,
}) {


  //url for manually uploaded file will look like so:
  //  https://nsribrvbkekkkanclndt.supabase.co/storage/v1/object/public/eventImages/IMAGENAME.png

  //we will override the image value with the image path when creating the event itself
  //make imagePath unique with random prefix; we need the URL for this
  //replace any slashes because supabase will create a folder structure based on slashes

  //check the image object; a new image will yield a FileList,
  //while an edit without changing/uploading new file with yield a path
  const hasImagePath =
    typeof image === "string" && image?.startsWith(supabaseUrl);

  //we can override imageName here if we already have a path because
  //we will just use the existing image value rather than concatenating
  const imageName = hasImagePath
    ? ""
    : `${Math.random()}-${image.name.replace("/", "")}`;

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/eventImages/${imageName}`;

  //don't override the image object itself;
  //replace it in the mutate statement only

  //if we need to upload the image, do that and get the URL
  let imgUrl = "";
  let publicUrl = "";
  if (!hasImagePath) {
    const { error: storageError, data: storageData } = await supabase.storage
      .from("eventImages")
      .upload(imageName, image)


    if (storageError) {
      console.error(storageError);
      throw new Error("Image could not be uploaded; cabin not created");
    }

    imgUrl = `${supabaseUrl}/storage/v1/object/public/${storageData.fullPath}`;

    if (imgUrl === imagePath) publicUrl = storageData.fullPath;
    else throw new Error("Returned imageURL not matched to expected path")
  }


  //get the image URL; failsafe
  const { img } = supabase
    .storage
    .from('your-bucket-name')
    .getPublicUrl(imageName);

  console.log("img:", img)

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
      imageUrl: imagePath,
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