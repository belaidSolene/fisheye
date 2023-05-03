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

            <div class="photographer-card__details" tabindex="0">
                <h3  class="sr-only">Détails photographe,</h3>
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
        const content = `
            <div class="photographer-header__description">
                <h1>${this._photographer.name}</h1>
                <p class="photographer-header__localisation" lang="en">${this._photographer.localisation}</p>
                <p class="photographer-header__tagline">${this._photographer.tagline}</p>
            </div>

            <button class="btn btn--hover" onclick="toggleForm()">Contactez-moi</button>
            
            <img src="${this._photographer.portrait}" alt="" class="photographer-header__pp round">
        `

        $wrapper.innerHTML = content;
    }

    insertLikesAndPrice($wrapper, likes) {
        const content = `
        <span class="total-likes">${likes} <i class="fa-solid fa-heart"></i></span>
        <span class="price">${this._photographer.price}</span>
        `

        $wrapper.innerHTML = content;
    }

    insertNamePhotographer($wrapper) { //Passer dans PhotographerCard
        $wrapper.innerHTML = `Contactez-moi <br> ${this._photographer.name}`
    }
}