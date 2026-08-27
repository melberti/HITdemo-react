import supabase from "./supabase";
import { getExtension } from "../utilities/utilities";

//allow aborts so query stops when user searches or switches to MY

export async function getMyImages({ signal }) {

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .storage
        .from('eventImages')
        .list(user.id, {}, { signal }) //signal to abort if another request comes in

    if (error) throw new Error(error.message)

    return data;

}


export async function getImages({ signal }) {


    const { data, error } = await supabase.storage
        .from("eventImages")
        .list("", {}, { signal }) //signal to abort if another request comes in

    if (error) throw new Error(error.message)

    return data;

}

export async function uploadImage(image) {

    //create unique imageName by appending random number and saving to user's own folder
    function setImageName(imageName) {
        const ext = getExtension(imageName);
        const baseName = imageName.replace(`.${ext}`, "");

        return (`${user.id}/${baseName.replace("/", "")}-${Math.floor(Math.random() * 1000) + 1}.${ext}`);
    }

    //get user ID  
    const { data: { user } } = await supabase.auth.getUser();

    const imageName = setImageName(image.img.name);

    //upload the image
    const { error: storageError, data: storageData } = await supabase.storage
        .from("eventImages")
        .upload(imageName, image.img)

    if (storageError) {
        console.error(storageError);
        throw new Error("Image could not be uploaded");
    }

    // console.log('data returned from save', storageData)
    // console.log('actual name', storageData.path);
    // console.log('expected name', imageName);

    if (storageData.path !== imageName)
        throw new Error("Returned storage URL not matched to expected path")


}
