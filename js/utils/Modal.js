class Modal {
    constructor() {
        this._isOpen = false;

        this._modalSection = document.querySelector('#modal-section');
        this._container = document.querySelector('.container');

    }

    _openModal() {
        // Code pour ouvrir le modal
        this._isOpen = true;
        this._modalSection.classList.add('active');
        this._container.inert = true;

        document.addEventListener('click', this._handleOutsideClick.bind(this));
        document.addEventListener('keydown', this._trapFocus.bind(this));
    }

    _closeModal() {
        // Code pour fermer le modal
        this._isOpen = false;
        this._modalSection.classList.remove('active');
        this._container.inert = false;

        document.removeEventListener('click', this._handleOutsideClick.bind(this))
        // document.removeEventListener('keydown', this._trapFocus.bind(this));
    }

    _handleOutsideClick(event) {
        // À implémenter dans la classe enfant
    }


    _trapFocus(event) {
        const focusableElements = this._$wrapperForm.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        const isTabPressed = event.key === 'Tab';

        if (!isTabPressed) {
            return;
        }

        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }

}