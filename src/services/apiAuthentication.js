import supabase from "./supabase";

export async function signUp({ email, password, firstName, lastName }) {

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);

  }

  console.log('data returned by signUp API:', data)
  return data;
}

export async function signIn({ email, password }) {

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log('data returned by signIn API:', data)
  return data;
}


export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  console.log('data returned by getUSER api:', user)
  return user;
}