export function renderArtists(artists, container) {
    container.innerHTML = "";

    artists.forEach((artist) => {
        const card = document.createElement("artist-card");

        card.setAttribute("data-id", artist.id);
        card.setAttribute("name", artist.name);
        card.setAttribute("genre", artist.genre);
        card.setAttribute("stage", artist.stage);
        card.setAttribute("time",artist.time);
        card.setAttribute("country", artist.country);
        card.setAttribute("headliner", artist.headliner);

        container.appendChild(card);
        });
    
}