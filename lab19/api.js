export async function fetchArtists(){
  const response = await fetch("artists.json");

  if(!response.ok){
    throw new Error("Failed to fetch artists");
  }

  const data = await response.json();
  return data;
}