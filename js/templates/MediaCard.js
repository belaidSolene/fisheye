/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// The MediaCard class represents a media item and provides methods to create and manage the media card elements.
class MediaCard {
    constructor(media) {
        this._media = media;
    }

    /**
     * Create the HTML structure for the media card.
     * @param {Array<Media>} sortedList - The sorted list of media items. This is needed for launching the lightbox and navigating through the media items.
     * @returns {HTMLElement} - The article element containing the media card content.
     */
    createMediaCard(sortedList) {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('media-card');

        const media = this._media.type === 'image' ?
            `<img  class="media-card__content__media" src="${this._media.image}" alt="${this._media.title}">` :
            `<video class="media-card__content__media" src="${this._media.video}" alt="${this._media.title}"></video>`;

        const likeMsg = this._media.type === 'image' ? 'Aimer ce cliché' : 'Aimer cette vidéo';
        const typeMedia = this._media.type === 'image' ? 'Cliché' : 'Vidéo';

        const mediaCard = `
            <div id="${this._media.id}" class="media-card__content" aria-live="polite" tabindex="0" aria-label="${typeMedia} ${this._media.title}, lien : vue approchée">
            ${media}
            </div>
    
            <div class="media-card__description">
            <p tabindex="0" id="title-${this._media.id}" class="media-card__description__title" lang="en">${this._media.title}</p>
            <button class="btn-likes" title="${likeMsg}">${this._media.likes} <i  aria-hidden="true" class="fa-solid fa-heart"></i> <span class="sr-only">"j'aime", </span></i></button>
          </div>            
        `;

        $wrapper.innerHTML = mediaCard;

        // Store the reference of the element for future use.
        this._template = $wrapper;

        // Add event listeners to the media card.
        this._addMediaCardEventListeners(sortedList);

        return $wrapper;
    }
    
    /**
     * Add event listeners to the media card.
     * @param {Array<Media>} sortedList - The sorted list of media items. This is needed for launching the lightbox and navigating through the media items.
     * @private
     */
    _addMediaCardEventListeners(sortedList) {
        // Add event listener for opening the lightbox on click or key press.
        const media = this._template.querySelector('.media-card__content');
        const openLightbox = () => {
            const lightbox = new MediaLightbox(sortedList, this._media.id, 'lightbox');
            lightbox.showLightbox();
        };

        media.addEventListener('click', (event) => {
            event.stopPropagation();
            openLightbox();
        });
        media.addEventListener('keydown', (event) => {
            const key = event.key;

            if (key === 'Enter' || key === 'Space') {
                openLightbox();
            }
        });

        // Add event listener for updating likes on button click.
        const btnLike = this._template.querySelector('.btn-likes');
        const updateLike = new UpdateLike();
        
        btnLike.addEventListener('click', (event) => {
            event.preventDefault();
            updateLike.update(btnLike);
        });
    }

    /**
     * Create the HTML structure for the media item inside the lightbox.
     * @returns {string} - The HTML content for the media item inside the lightbox.
     */
    createLightBoxMedia() {
        const media = this._media.type === 'image' ?
            `<img tabindex="0" class="lightbox__media-container__content" src="${this._media.image}" alt="${this._media.title}"/>` :
            `<video class="lightbox__media-container__content video" src="${this._media.video}" alt="${this._media.title}" controls loop></video>`;

        const lightboxMedia = `
        ${media}

        <h3 lang="en" tabindex=0>${this._media.title}</h3>
        `;

        return lightboxMedia;
    }
}