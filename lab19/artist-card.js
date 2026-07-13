class ArtistCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode:"open"});
    }

    connectedCallback(){
        this.render();
    
    }

    render(){
        const template = document.getElementById("artist-template");
        const clone = template.content.cloneNode(true);
        
        clone.querySelector(".name").textContent = this.getAttribute("name");
        clone.querySelector(".genre").textContent = this.getAttribute("genre");
        clone.querySelector(".stage").textContent = this.getAttribute("stage");
        clone.querySelector(".time").textContent = this.getAttribute("time");
        clone.querySelector(".country").textContent = this.getAttribute("country");

        const detailsBtn = clone.querySelector(".details-btn");
        detailsBtn.addEventLstener("click", () =>{
            this.dispatchEvent(
                new CustomEvent("artist-seleted", {
                   detail: { id: this.getAttribute("data-id") },
                   bubbles:true,
                   composed:true, 
                })
            );
        });

        
        this.shadowRoot.appendChild(clone);
    }
}
customElements.define("artist-card", ArtistCard);