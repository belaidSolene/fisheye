class DisplayData {
    constructor(photographer) {
        this._photographer = photographer;
    }

    insertLikesAndPrice($wrapper, likes) { //Passer dans PhotographerCard
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
