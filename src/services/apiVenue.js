import supabase from "./supabase";
import { useUser } from "../features/authentication/useUser";

export async function addVenue({ name, address1, city, state, zipCode, url, phone }) {

    console.log('api add venue', name, address1, city, state, zipCode, url, phone);
    const { data, error } = await supabase
        .from('venue')
        .insert({ name, address1, city, state, zipCode, url, phone })
        .select()

    //check for errors
    if (error) {
        console.error(error);
        throw new Error("Error adding venue");
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