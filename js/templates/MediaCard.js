class MediaCard {
    constructor(media) {
        this._media = media;
    }

    createMediaCard(sortedList) {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('media-card')

        const media = this._media.type === 'image' ?
            `<img tabindex="0" id="${this._media.id}" class="media-card__media" src="${this._media.image}" alt="${this._media.title}">` :
            `<video tabindex="0" id="${this._media.id}" class="media-card__media" src="${this._media.video}" alt="${this._media.title}"></video>`;

        const mediaCard = `
            ${media}
    
            <div class="media-card__description">
            <p tabindex="0" class="media-card__description__title" lang="en">${this._media.title}</p>
            <button class="btn-likes">${this._media.likes} <i  aria-hidden="true" class="fa-solid fa-heart"></i> <span class="sr-only">j'aime, </span></i></button>
          </div>            
        `;

        $wrapper.innerHTML = mediaCard;

        // Stocker la référence de l'élément dans une propriété pour une utilisation future
        this._template = $wrapper;

        // Ajouter les écouteurs d'événements
        this._addEventListeners(sortedList);

        // Retourner l'élément
        return $wrapper;
    }

    createLightBoxMedia() {
        const media = this._media.type === 'image' ?
            `<img tabindex="0" class="lightbox__media-container__content" src="${this._media.image}" alt="${this._media.title}">` :
            `<video class="lightbox__media-container__content video" src="${this._media.video}" alt="${this._media.title}" controls loop></video>`;

        const lightboxMedia = `
        ${media}

        <h3 lang="en">${this._media.title}</h3>
        `;

        return lightboxMedia;
    }

    // Méthode privée qui se charge d'ajouter les écouteurs d'événements
    _addEventListeners(sortedList) {
        const openLightbox = () => {
            const lightbox = new MediaLightbox(sortedList, this._media.id, 'lightbox');
            lightbox.showLightbox();
        }

        // Ajouter l'écouteur pour l'ouverture de la lightbox
        const media = this._template.querySelector('.media-card__media');

        media.addEventListener('click', (event) => {
            event.stopPropagation();
            openLightbox();
        });

        media.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key === 'Enter' || key === 'Space') {
                openLightbox();
            }
        })

        // Ajouter l'écouteur pour la mise à jour des likes
        const btnLike = this._template.querySelector('.btn-likes');
        const updateLike = new UpdateLike();
        btnLike.addEventListener('click', (event) => {
            event.preventDefault();
            updateLike.update(btnLike);
        });
    }
}