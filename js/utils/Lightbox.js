/**
 * The Lightbox class represents a lightbox modal window for displaying media content, such as images and videos.
 * It extends the Modal class and provides methods to show and navigate media items.
 */
class Lightbox extends Modal {
    /**
    * Creates an instance of the Lightbox class.
    * @param {string} lightboxId - The ID of the lightbox wrapper element or the HTML element itself.
    */
    constructor(lightboxId) {
        super();
        this._lightbox = this._initWrapper(lightboxId);
        this._lightboxCloseBtn = this._lightbox.querySelector('.lightbox__btn--close');
        this._lightboxPrevBtn = this._lightbox.querySelector('.lightbox__btn__nav--prev');
        this._lightboxNextBtn = this._lightbox.querySelector('.lightbox__btn__nav--next');
        this._lightboxContent = this._lightbox.querySelector('.lightbox__media-container');
    }

    /**
    * Adds event listeners for keyboard navigation and buttons in the lightbox.
    * @private
    */
    _addEventListener() {
        // Keyboard navigation
        this._lightbox.addEventListener('keydown', (event) => {
            const key = event.key;

            // Check if NVDA (NonVisual Desktop Access) is active to handle arrow keys differently
            const isNVDAActive = /NVDA/.test(navigator.userAgent);

            // If NVDA is active and the user presses the ArrowUp or ArrowDown key, ignore it
            // This is done to avoid conflicting with NVDA's own keyboard navigation behavior
            if (isNVDAActive && (key === 'ArrowUp' || key === 'ArrowDown')) {
                return;
            }

            // Handle keyboard navigation inside the lightbox
            switch (key) {
                case 'Escape':
                    event.preventDefault();
                    this._close();
                    break;

                case 'ArrowLeft':
                case 'ArrowDown':
                    event.preventDefault();
                    this.showPrev();
                    break;

                case 'ArrowRight':
                case 'ArrowUp':
                    event.preventDefault();
                    this.showNext();
                    break;
            }
        })

        // Close button
        this._lightboxCloseBtn.addEventListener('click', () => {
            this._close();
        });

        // Left arrow
        this._lightboxPrevBtn.addEventListener('click', () => {
            this.showPrev();
        });

        // Right arrow
        this._lightboxNextBtn.addEventListener('click', () => {
            this.showNext();
        });
    }

    /**
    * Shows the lightbox with the selected media item.
    */
    showLightbox() {
        super._openModal(this._lightbox);
        this._lightbox.classList.add('active');

        this._addEventListener();
        document.addEventListener('wheel', this._handleOutsideWheel, { passive: false });
        this.showMedia();
        this._lightbox.focus();
    }

    /**
    * Closes the lightbox.
    * @private
    */
    _close() {
        super._closeModal();
        this._lightbox.classList.remove('active');
        document.removeEventListener('wheel', this._handleOutsideWheel, { passive: false });

        this._lastMedia().focus();
    }

    /**
    * Handles the outside click event for the lightbox.
    * @param {Event} event - The click event.
    * @private
    */
    _handleOutsideClick = (event) => {
        if (this._isOpen && !this._lightbox.contains(event.target)) {
            this._close();
        }
    }

    /**
    * Handles the wheel event outside the lightbox to prevent scrolling.
    * @param {Event} event - The wheel event.
    * @private
    */
    _handleOutsideWheel(event) {
        event.preventDefault();
    }

    /**
    * Displays the media content in the lightbox. Must be implemented by the subclass.
    * @throws {Error} - This method must be implemented by the subclass.
    */
    showMedia() {
        // Abstract method - No default implementation
        throw new Error("The showMedia method must be implemented by the subclass.");
    }

    /**
    * Shows the previous media item in the lightbox. Must be implemented by the subclass.
    * @throws {Error} - This method must be implemented by the subclass.
    */
    showPrev() {
        // Abstract method - No default implementation
        throw new Error("The showPrev method must be implemented by the subclass.");
    }

    /**
    * Shows the next media item in the lightbox. Must be implemented by the subclass.
    * @throws {Error} - This method must be implemented by the subclass.
    */
    showNext() {
        // Abstract method - No default implementation
        throw new Error("The showNext method must be implemented by the subclass.");
    }
}

/**
 * The MediaLightbox class extends Lightbox and represents a lightbox modal window specifically
 * designed for displaying media items like images and videos in a carousel format.
 */
class MediaLightbox extends Lightbox {
    /**
    * Creates an instance of the MediaLightbox class.
    * @param {Map<number, Media>} mediaMap - A map of media items with their IDs as keys.
    * @param {string} idMediaClicked - The ID of the media item that was clicked to open the lightbox.
    * @param {string} lightboxId - The ID of the lightbox wrapper element.
    */
    constructor(mediaMap, idMediaClicked, lightboxId) {
        super(lightboxId);

        this._medias = Array.from(mediaMap.values());
        this._currentIndex = Array.from(mediaMap.keys()).indexOf(parseInt(idMediaClicked));
    }

    /**
    * Displays the selected media content in the lightbox.
    * Overrides the base class method to show the media card template in the lightbox container.
    */
    showMedia() {
        const media = this._medias[this._currentIndex];
        const template = new MediaCard(media);

        this._lightboxContent.innerHTML = template.createLightBoxMedia();

        // If the media is a video, play it automatically
        if (media.type === 'video') {
            this._lightboxContent.querySelector('.video').play();
        }
    }

    /**
    * Shows the previous media item in the lightbox.
    * Overrides the base class method to navigate to the previous media in the carousel.
    */
    showPrev() {
        this._currentIndex = (this._currentIndex === 0) ? this._medias.length - 1 : this._currentIndex - 1;
        this.showMedia();
    }

    /**
    * Shows the next media item in the lightbox.
    * Overrides the base class method to navigate to the next media in the carousel.
    */
    showNext() {
        this._currentIndex = (this._currentIndex === this._medias.length - 1) ? 0 : this._currentIndex + 1;
        this.showMedia();
    }

    /**
    * Returns the DOM element representing the last focused media item.
    * Return the media element in the document with the current index.
    * @returns {HTMLElement} - The DOM element representing the last focused media item.
    * @private
    */
    _lastMedia() {
        return document.getElementById(this._medias[this._currentIndex].id);
    }
}
