/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// The PhotographerCard represents a photographer item and provides methods to display and manage the photographer informations.
class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    /**
    * Create the HTML structure for the photographer card on the index.html page.
    * @returns {HTMLElement} - The article element containing the photographer card content.
    */
    createPhotographerCard() {
        // Create a wrapper element to hold the photographer card.
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card');

        // Create the HTML content for the photographer card.
        // The card also has a link to the photographer's individual page.
        const photographerCard = `
            <a href="./photographer.html?id=${this._photographer.id}""> 
                <img class="photographer-card__pp round" 
                    src="${this._photographer.portrait}" 
                    alt="">
                <h2 lang="en">${this._photographer.name}</h2>
            </a>

            <div class="photographer-card__details" tabindex="0" aria-labelledby="details-label-${this._photographer.id} details-${this._photographer.id}">
                <p id="details-label-${this._photographer.id}" class="sr-only">Détails photographe,</p>    
                <div id="details-${this._photographer.id}">
                    <p class="photographer-card__localisation" lang="en">
                        <span class="sr-only"> Localisation :</span>
                        ${this._photographer.localisation}
                        <span class="sr-only">,</span>
                    </p>
                    <p class="photographer-card__tagline">
                        <span class="sr-only">Citation :</span>
                        ${this._photographer.tagline}
                        <span class="sr-only">,</span>
                    </p>
                    <p class="photographer-card__price">
                        <span class="sr-only">Forfait :</span>
                        ${this._photographer.price}
                    </p>
                </div>
            </div>
        `;

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }

    /**
    * Create the HTML structure for the photographer's header on the photographer.html page.
    * @param {HTMLElement} $wrapper - The wrapper element where the photographer header will be inserted.
    */
    createPhotographerHeader($wrapper) {
        const content = `
            <div class="photographer-header__description">
                <h1 tabindex="0">${this._photographer.name}</h1>

                <div tabindex="0">
                    <h2  class="sr-only">Détails photographe,</h2>
                    <span class="sr-only">Localisation :</span>
                    <p class="photographer-header__description__localisation" lang="en">
                        ${this._photographer.localisation}
                        <span class="sr-only">,</span>
                    </p>
                    <p class="photographer-header__description__tagline">
                        <span class="sr-only">Citation :</span>
                        ${this._photographer.tagline}
                    </p>
                </div>
            </div>

            <button class="btn btn--hover">
                <span class="btn--hover__text" data-text="Contacter ${this._photographer.name}">Contactez-moi</span>
            </button>
            
            <img tabindex="0" src="${this._photographer.portrait}" alt="${this._photographer.name}" class="photographer-header__pp round">
        `;

        $wrapper.innerHTML = content;

        // Store the template for later use and add an event listener to the contact form button.
        this._template = $wrapper;
        this._addContactFormButtonListener();
    }

    /**
    * Add a click event listener to the contact form button to toggle the form's visibility.
    * @private
    */
    _addContactFormButtonListener() {
        const btn = this._template.querySelector('button');
        const $wrapperContactForm = document.querySelector('#contact-form');

        $wrapperContactForm.querySelector('#contact-title').innerHTML = `Contactez-moi <br> <span lang="en">${this._photographer.name}</span>`;

        const contactForm = new ContactForm("contact-photographer", $wrapperContactForm);
        contactForm.generate();

        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            contactForm.toggleForm(event.currentTarget);
        });
    }

    /**
    * Get the HTML content for the total likes and photographer's price on the photographer.html page.
    * @param {number} likes - The total number of likes for the photographer's media.
    * @returns {string} - The HTML content for the total likes and photographer's price.
    */
    insertLikesAndPrice(likes) {
        return `
            <p class="total-likes">${likes} <i  aria-hidden="true" class="fa-solid fa-heart"></i> <span class="sr-only"> "j'aime", </span></p>
            <p class="price"><span class="sr-only">forfait : </span> ${this._photographer.price}</p>
        `;
    }
}