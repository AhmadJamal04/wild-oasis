import supabase, { supabaseUrl } from "./supabase";

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
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log("has image path", hasImagePath);
  const imageName = `${Math.random()}-${newCabin.name.image}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `https://ngcnmikizbbofyizolyp.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  // 1 create/edit cabin
  let query = supabase.from("cabins");

  // A Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  console.log("cabindata", data);
  if (error) {
    console.log(error);
    throw new error("Cabin could not be created");
  }
  // 2 upload image
  if (hasImagePath) return data; //if image already uploaded then dont upload it again
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3 delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
