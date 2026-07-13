import { fetchArtists } from "./api.js";
import { Artist } from "./artist.js";
import { renderArtists } from "./ui.js";
import "./artist-card.js";


const loadBtn = document.getElementById("load-btn");
const clearBtn = document.getElementById("clear-btn");
const statusEl = document.getElementById("status");
const lineupContainer = document.getElementById("lineup-container");
const detailsPanel = document.getElementById("details-panel");


async function loadLineup(){
    statusEl.textContent = "Loading lineup ...";

    try{
        const data = await fetchArtists();
        const artists = data.map((item) => Artist.fromObject(item));

        renderArtists(artists, lineupContainer);
        statusEl.textContent = "Lineup loaded successfully.";
    }catch (error){
        statusEl.textContent = "Failed to load lineup.";
        console.error(error);
    }
}

loadBtn.addEventListener("click", loadLineup);

clearBtn.addEventListener("click", () => {
  lineupContainer.innerHTML = "";
  detailsPanel.innerHTML = "<p>Sélectionne un artiste pour voir les détails</p>";
  statusEl.textContent = "Lineup cleared.";
});

lineupContainer.addEventListener("artist-selected", (event) => {
  const id = event.detail.id;
  detailsPanel.innerHTML = `<p>Détails de l'artiste sélectionné (id: ${id})</p>`;
});
