class Modal {
    constructor(wrapper) {
        this._initWrapper(wrapper);
        this._isOpen = false;

        this._modalSection = document.querySelector('#modal-section');
        this._container = document.querySelector('.container');
    }

    _initWrapper(wrapper) {
        const isHTMLElement = (obj) => {
            return obj instanceof HTMLElement;
        }

        if (typeof wrapper === 'string') {
            this._$wrapper = document.querySelector(`#${wrapper}`);
        } else if (isHTMLElement(wrapper)) {
            this._$wrapper = wrapper;
        } else {
            throw new Error("The 'wrapper' argument must be either a string representing the element's ID or an HTMLElement object.")
        }
    }

    _openModal() {
        // Code pour ouvrir la modal
        this._isOpen = true;
        this._modalSection.classList.add('active');
        this._container.inert = true;
        this._$wrapper.focus();

        document.addEventListener('click', this._handleOutsideClick.bind(this));
        document.addEventListener('keydown', this._trapFocus.bind(this));
    }

    _closeModal() {
        // Code pour fermer la modal
        this._isOpen = false;
        this._modalSection.classList.remove('active');
        this._container.inert = false;

        document.removeEventListener('click', this._handleOutsideClick.bind(this))
        document.removeEventListener('keydown', this._trapFocus.bind(this));
    }

    _handleOutsideClick(event) {
        if (this._isOpen && !this._$wrapper._container(event.target)) {
            this._close();
        }
    }

    _close() {
        // Abstract method - No default implementation
        throw new Error("The _close method must be implemented by the subclass.");
    }

    _trapFocus(event) {
        const focusableElements = this._modalSection.querySelectorAll(
            '[role="dialog"].active, [role="dialog"].active a[href], [role="dialog"].active button, [role="dialog"].active textarea, [role="dialog"].active input, [role="dialog"].active select, [role="dialog"].active [tabindex]:not([tabindex=\'-1\'])'
        );
        console.log(document.activeElement);

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