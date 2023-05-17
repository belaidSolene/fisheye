class Modal {
    constructor() {
        this._isOpen = false;

        this._modalSection = document.querySelector('#modal-section');
        this._container = document.querySelector('.container');
    }

    _initWrapper(wrapper) {
        const isHTMLElement = (obj) => {
            return obj instanceof HTMLElement;
        }

        if (typeof wrapper === 'string') {
            return document.querySelector(`#${wrapper}`);
        } else if (isHTMLElement(wrapper)) {
            return wrapper;
        } else {
            throw new Error("The 'wrapper' argument must be either a string representing the element's ID or an HTMLElement object.")
        }
    }

    _openModal() {
        // Code pour ouvrir la modal
        this._isOpen = true;
        this._modalSection.classList.add('active');
        this._container.inert = true;

        document.addEventListener('keydown', this._trapFocus.bind(this));       
        document.addEventListener('click', this._handleOutsideClick.bind(this));
    }

    _closeModal() {
        // Code pour fermer la modal
        this._isOpen = false;
        this._modalSection.classList.remove('active');
        this._container.inert = false;

        document.removeEventListener('keydown', this._trapFocus.bind(this));
        document.removeEventListener('click', this._handleOutsideClick.bind(this))
    }

    _handleOutsideClick(event) {
        // Abstract method - No default implementation
        throw new Error("The _handleOutsideClick method must be implemented by the subclass.");
    }

    _close() {
        // Abstract method - No default implementation
        throw new Error("The _close method must be implemented by the subclass.");
    }

    _trapFocus(event) {
        const focusableElements = this._modalSection.querySelectorAll(
            '[role="dialog"].active, [role="dialog"].active a[href], [role="dialog"].active button, [role="dialog"].active textarea, [role="dialog"].active input, [role="dialog"].active select, [role="dialog"].active [tabindex]:not([tabindex=\'-1\'])'
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