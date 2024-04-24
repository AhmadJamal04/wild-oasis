import supabase from "./supaBase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}
