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
