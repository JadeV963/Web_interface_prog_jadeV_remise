export async function fetchArtists(){
 const repsonse - await fetch("artists.json");

 if(!repsonse.ok){
    throw new Error("Failed to fetch artists");
 }

 const data = await repsonse.json();
 return data;
 
}