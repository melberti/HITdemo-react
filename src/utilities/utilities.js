import { supabaseUrl } from "../services/supabase";

export const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const urlValidationRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b(?:[-a-zA-Z0-9()@:%_\+.~#?& Flora\/=]*)$/;

export const phoneValidationRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/

export const zipValidationRegex = /[0-9]{5}/;

export const defaultImageUrl = `${supabaseUrl}/storage/v1/object/public/eventImages/NoImageProvided.png`;

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
