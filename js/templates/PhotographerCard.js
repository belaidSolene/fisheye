class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card')

        const photographerCard = `
            <a href="photographer.html?id=${this._photographer.id}""> 
                <img class="photographer-card__pp round" 
                    src="${this._photographer.portrait}" 
                    alt="">
                <h2 lang="en">${this._photographer.name}</h2>
            </a>

            <div class="photographer-card__details" tabindex="0" aria-label="Détails photographe,">
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
                    <span class="sr-only">Prix :</span>
                    ${this._photographer.price}
                </p>
            </div>
        `

        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }

    createPhotographerHeader($wrapper) {
        const textBtn = 'Contactez-moi';
        const content = `
            <div class="photographer-header__description">
                <h1 tabindex="0">${this._photographer.name}</h1>

                <div tabindex="0">
                    <h2  class="sr-only">Détails photographe,</h2>
                    <p class="photographer-header__description__localisation" lang="en">
                        <span class="sr-only">Localisation :</span>
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
                <span class="btn--hover__text" data-text="${textBtn}">${textBtn}</span>
            </button>
            
            <img tabindex="0" src="${this._photographer.portrait}" alt="${this._photographer.name}" class="photographer-header__pp round">
        `

        $wrapper.innerHTML = content;
        this._template = $wrapper;
        this._addListenerFormButton();
    }

    _addListenerFormButton() {
        const btn = this._template.querySelector('button');
        const $wrapperContactForm = document.querySelector('#contact-form')

        const contactForm = new ContactForm("contact-photographer", $wrapperContactForm);
        contactForm.generate();

        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            contactForm.toggleForm(event.currentTarget);
        })
    }

    insertLikesAndPrice($wrapper, likes) {
        const content = `
            <p class="total-likes">${likes} <i  aria-hidden="true" class="fa-solid fa-heart"></i> <span class="sr-only">j'aime, </span></p>
            <p class="price">${this._photographer.price}</p>
        `

        $wrapper.innerHTML = content;
    }

    titleContactForm($wrapper) {
        $wrapper.innerHTML = `Contactez-moi <br> <span lang="en">${this._photographer.name}</span>`
    }
}