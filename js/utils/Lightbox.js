class Lightbox {
    constructor(lightboxId) {
        this._modalSection = document.querySelector('#modal-section');

        this._lightbox = document.querySelector(`#${lightboxId}`);
        this._lightboxCloseBtn = this._lightbox.querySelector('.lightbox__btn--close');
        this._lightboxPrevBtn = this._lightbox.querySelector('.lightbox__btn__nav--prev');
        this._lightboxNextBtn = this._lightbox.querySelector('.lightbox__btn__nav--next');
        this._lightboxContent = this._lightbox.querySelector('.lightbox__media-container');
        this._isOpen = false;

        this._addEventListener();
    }

    _addEventListener() {
        // use keyboard
        this._lightbox.addEventListener('keydown', (event) => {
            const key = event.key;

            switch (key) {
                case 'Escape':
                    event.preventDefault();
                    this.closeLightbox();
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
            this.closeLightbox();
        });

        // left arrow
        this._lightboxPrevBtn.addEventListener('click', () => {
            this.showPrev();
        });

        // right arrow
        this._lightboxNextBtn.addEventListener('click', () => {
            this.showNext();
        });

        document.addEventListener('click', (event) => {
            if (this._isOpen && !this._lightbox.contains(event.target)) {
                this.closeLightbox();
            }
        })
    }

    showLightbox() {
        this._lightbox.classList.add('active');
        this._modalSection.classList.add('active');
        document.querySelector(".container").inert = true;
        this._lightbox.focus();  
        
        this.showMedia();
        this._isOpen = true;
    }

    closeLightbox() {
        this._lightbox.classList.remove('active');
        this._modalSection.classList.remove('active');
        this._isOpen = false;
        document.querySelector(".container").inert = false;
        this._lastMedia().focus();
    }

    showMedia() {
        // À implémenter dans la classe enfant
    }

    showPrev() {
        // À implémenter dans la classe enfant
    }

    showNext() {
        // À implémenter dans la classe enfant
    }

    _lastMedia() {
        // À implémenter dans la classe enfant
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
        return document.getElementById(this._medias[this._currentIndex].id)
    }
}
