import { eventImageBaseUrl } from "../services/supabase";

export const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const urlValidationRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b(?:[-a-zA-Z0-9()@:%_\+.~#?& Flora\/=]*)$/;

export const phoneValidationRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/

export const zipValidationRegex = /[0-9]{5}/;

export const defaultImageUrl = `${eventImageBaseUrl}NoImageProvided.png`;

export function formatPhoneNumber(value) {
    if (!value) return value;

    // Clear all non-digit characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    const length = phoneNumber.length;

    // Dynamically build the mask based on character length
    if (length < 4) return phoneNumber;
    if (length < 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};


export function getExtension(filename) {
    // console.log(filename);
    // console.log(filename.lastIndexOf("."));
    // return false;
    return filename.slice((filename.lastIndexOf(".") >>> 0) + 1);
}

export function getFilenameFromUrl(url, userId) {
    if (url === null) return "";
    const replace1 = url.replace(eventImageBaseUrl, "");
    const replace2 = replace1.replace(`${userId}/`, "")
    //return replace2 === "NULL" ? "" : replace2;
    return replace2;
}

export function getTimeOptions() {
    var options = [
        { id: "07:00:00", text: "07:00 AM" },
        { id: "07:30:00", text: "07:30 AM" },
        { id: "08:00:00", text: "08:00 AM" },
        { id: "08:30:00", text: "08:30 AM" },
        { id: "09:00:00", text: "09:00 AM" },
        { id: "09:30:00", text: "09:30 AM" },
        { id: "10:00:00", text: "10:00 AM" },
        { id: "10:30:00", text: "10:30 AM" },
        { id: "11:00:00", text: "11:00 AM" },
        { id: "11:30:00", text: "11:30 AM" },
        { id: "12:00:00", text: "Noon" },
        { id: "12:30:00", text: "12:30 PM" },
        { id: "13:00:00", text: "01:00 PM" },
        { id: "13:30:00", text: "01:30 PM" },
        { id: "14:00:00", text: "02:00 PM" },
        { id: "14:30:00", text: "02:30 PM" },
        { id: "15:00:00", text: "03:00 PM" },
        { id: "15:30:00", text: "03:30 PM" },
        { id: "16:00:00", text: "04:00 PM" },
        { id: "16:30:00", text: "04:30 PM" },
        { id: "17:00:00", text: "05:00 PM" },
        { id: "17:30:00", text: "05:30 PM" },
        { id: "18:00:00", text: "06:00 PM" },
        { id: "18:30:00", text: "06:30 PM" },
        { id: "19:00:00", text: "07:00 PM" },
        { id: "19:30:00", text: "07:30 PM" },
        { id: "20:00:00", text: "08:00 PM" },
        { id: "20:30:00", text: "08:30 PM" },
        { id: "21:00:00", text: "09:00 PM" },
        { id: "21:30:00", text: "09:30 PM" },
        { id: "22:00:00", text: "10:00 PM" },
        { id: "22:30:00", text: "10:30 PM" },
        { id: "23:00:00", text: "11:00 PM" },
        { id: "23:30:00", text: "11:30 PM" },
        { id: "00:00:00", text: "Midnight" },
    ]
    return options;
}