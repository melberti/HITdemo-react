import supabase from "./supabase";

export async function getCategories() {
    const { data, error } = await supabase.from("category").select("*");

    if (error) {
        console.error(error);
        throw new Error("Categories could not be loaded");
    }

    return data;
}