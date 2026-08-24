import supabase from "./supabase";

export async function signUp({ email, password, firstName, lastName }) {

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName
      }
    }
  });

  if (error) {
    throw new Error(error.message);

  }

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

  return data;
}


export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null; //no auth'd user
  }

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return user;
}


export async function signOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return;

}