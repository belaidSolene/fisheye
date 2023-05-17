class Lightbox extends Modal{
    constructor(lightboxId) {
        super ();
        this._lightbox = this._initWrapper(lightboxId);
        this._lightboxCloseBtn = this._lightbox.querySelector('.lightbox__btn--close');
        this._lightboxPrevBtn = this._lightbox.querySelector('.lightbox__btn__nav--prev');
        this._lightboxNextBtn = this._lightbox.querySelector('.lightbox__btn__nav--next');
        this._lightboxContent = this._lightbox.querySelector('.lightbox__media-container');
    }

    _addEventListener() {
        // keyboard use
        this._lightbox.addEventListener('keydown', (event) => {
            const key = event.key;

            // Vérifier si NVDA est actif
            const isNVDAActive = /NVDA/.test(navigator.userAgent);

            // Ignorer les touches fléchées si NVDA est actif
            if (isNVDAActive && (key === 'ArrowUp' || key === 'ArrowDown')) {
                return;
            }

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

        // close button
        this._lightboxCloseBtn.addEventListener('click', () => {
            this._close();
        });

        // left arrow
        this._lightboxPrevBtn.addEventListener('click', () => {
            this.showPrev();
        });

        // right arrow
        this._lightboxNextBtn.addEventListener('click', () => {
            this.showNext();
        });
    }

    showLightbox() {
        super._openModal(this._lightbox);
        this._lightbox.classList.add('active');

        this._addEventListener();
        document.addEventListener('wheel', this._handleOutsideWheel, { passive: false });
        this.showMedia();
        this._lightbox.focus();
    }

    _close() {
        super._closeModal();
        this._lightbox.classList.remove('active');
        document.removeEventListener('wheel', this._handleOutsideWheel, { passive: false });

        this._lastMedia().focus();
    }

    _handleOutsideClick = (event) => {
        if (this._isOpen && !this._lightbox.contains(event.target)) {
            this._close();
        }
    }

    _handleOutsideWheel(event) {
        event.preventDefault();
    }

    showMedia() {
        // Abstract method - No default implementation
        throw new Error("The showMedia method must be implemented by the subclass.");
    }

    showPrev() {
        // Abstract method - No default implementation
        throw new Error("The showPrev method must be implemented by the subclass.");
    }

    showNext() {
        // Abstract method - No default implementation
        throw new Error("The showNext method must be implemented by the subclass.");
    }

    _lastMedia() {
        // Abstract method - No default implementation
        throw new Error("The _lastMedia method must be implemented by the subclass.");
    }
}

class MediaLightbox extends Lightbox {
    constructor(mediaMap, idMediaClicked, lightboxId) {
        super(lightboxId);

        this._medias = Array.from(mediaMap.values());
        this._currentIndex = Array.from(mediaMap.keys()).indexOf(parseInt(idMediaClicked));
    }

    showMedia() {
        const media = this._medias[this._currentIndex];
        const template = new MediaCard(media);

        this._lightboxContent.innerHTML = template.createLightBoxMedia();

        if (media.type === 'video') {
            const video = this._lightboxContent.querySelector('.video');
            video.play();
        }
    }

    showPrev() {
        this._currentIndex = (this._currentIndex === 0) ? this._medias.length - 1 : this._currentIndex - 1;
        this.showMedia();
    }

    showNext() {
        this._currentIndex = (this._currentIndex === this._medias.length - 1) ? 0 : this._currentIndex + 1;
        this.showMedia();
    }

    _lastMedia() {
        return document.getElementById(this._medias[this._currentIndex].id);
    }
}
