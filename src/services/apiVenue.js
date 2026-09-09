import supabase from "./supabase";


export async function addVenue({ name, address1, city, state, zipCode, url, phone, isRetired }) {


    const { data, error } = await supabase
        .from('venue')
        .insert({ name, address1, city, state, zipCode, url, phone, isRetired })
        .select()

    //check for errors
    if (error) {
        console.error(error);
        throw new Error("Error adding venue");
    }

    const newVenue = data[0]
    return newVenue
}

export async function updateVenue({ id, name, address1, city, state, zipCode, url, phone, isRetired }) {

    const { data, error } = await supabase
        .from('venue')
        .update({ name, address1, city, state, zipCode, url, phone, isRetired })
        .eq('id', id)
        .select()

    //check for errors
    if (error) {
        console.error(error);
        throw new Error("Error updating venue");
    }

    return { data }
}

export async function getMyVenues({ sortCol, sortDir = "asc" }) {
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Filter the query dynamically
    const { data, error } = await supabase
        .from('venue')
        .select('*')
        .eq('userId', user.id)
        .order('isRetired', { ascending: true })
        .order(sortCol ? sortCol : "name", { ascending: sortDir === "asc" ? true : false })

    //check for errors
    if (error) {
        console.error(error);
        throw new Error("Error retrieving your venues");
    }

    return data;
}

export async function getVenues() {

    // 2. Filter the query dynamically
    const { data, error } = await supabase
        .from('venue')
        .select('*')
        .eq('isRetired', false)
        .order('name', { ascending: true });

    //check for errors
    if (error) {
        console.error(error);
        throw new Error("Error retrieving venues");
    }

    return data
}