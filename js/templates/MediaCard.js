class MediaCard {
    constructor(media) {
        this._media = media;
    }

    createMediaCard() {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('media-card')

        //console.log(`mediaType : ${this._media.mediaType()}`);

        const media = this._media.type === 'image' ? 
        `<img class="media-card__media" src="${this._media.image}" alt="">` :
        `<video class="media-card__media" src="${this._media.video}" alt=""></video>`

        const mediaCard = `
            ${media}

            <div class="media-card__description">
            <p class="media-card__description__title">${this._media.title}</p>
            <button class="btn-likes">${this._media.likes} <i class="fa-solid fa-heart"></i></button>
          </div>            
        `

        $wrapper.innerHTML = mediaCard;
        return $wrapper
    }
}