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