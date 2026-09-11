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

  //update user metadata email if not the same as user email 
  //due to confirmed email change
  if (data.user.email !== data.user.user_metadata.email) {
    if (data.user.confirmed_at > data.user.confirmation_sent_at) {
      updateMetadataEmail(data.user.email)
    }
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



export async function updateUser({ firstName, lastName, email }) {

  const { data, error } = await supabase.auth.updateUser({
    email,
    // password: "new-password",
    data: {
      firstName: firstName,
      lastName: lastName
    }
  })

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function updatePassword({ currentPassword, newPassword }) {

  const { data, error } = await supabase.auth.updateUser({
    current_password: currentPassword,
    password: newPassword
  })

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function updateMetadataEmail(email) {

  const { data, error } = await supabase.auth.updateUser({
    data: {
      email
    }

  })

  if (error) {
    throw new Error(error.message);
  }

  return data;
}