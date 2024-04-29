import supabase from "./supaBase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(Id) {
  const { error } = await supabase.from("cabins").delete().eq("id", Id);
  if (error) {
    console.log(error);
    throw new error("cabins could not be deleted");
  }
}
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${
    newCabin.name.image
  }`.replaceAll("/","");
  const imagePath = `https://ngcnmikizbbofyizolyp.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  //https://ngcnmikizbbofyizolyp.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-04-25T19%3A40%3A59.096Z
  // 1 create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
    console.log("cabindata",data)
  if (error) {
    console.log(error);
    throw new error("Cabin could not be created");
  }
  // 2 upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3 delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError)
    throw new Error("cabin image could not be uploaded and the cabin was not created")
  }
  return data;
}
