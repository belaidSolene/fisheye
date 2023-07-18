// The Modal class represents a modal window and provides functionality to open and close it. 
class Modal {
    constructor() {
        this._isOpen = false;

        // Elements to control the modal
        this._modalSection = document.querySelector('#modal-section');
        this._container = document.querySelector('.container');
    }

    /**
     * Initializes the wrapper element for the modal.
     * @param {string | HTMLElement} wrapper - The element or its ID representing the wrapper for the modal.
     * @returns {HTMLElement} - The wrapper element for the modal.
     * @throws {Error} - If the 'wrapper' argument is not a valid string or HTMLElement.
     */
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

    /**
    * Opens the modal window.
    */
    _openModal() {
        this._isOpen = true;
        this._modalSection.classList.add('active');
        this._container.inert = true;

        // Event listeners for keyboard and outside click
        document.addEventListener('keydown', this._trapFocus.bind(this));       
        document.addEventListener('click', this._handleOutsideClick.bind(this));
    }

    /**
    * Closes the modal window.
    */
    _closeModal() {
        this._isOpen = false;
        this._modalSection.classList.remove('active');
        this._container.inert = false;

        // Remove event listeners
        document.removeEventListener('keydown', this._trapFocus.bind(this));
        document.removeEventListener('click', this._handleOutsideClick.bind(this))
    }

   /**
    * Handles the outside click event for the modal. Must be implemented by the subclass.
    * @param {Event} event - The click event.
    * @throws {Error} - This method must be implemented by the subclass.
    */
    _handleOutsideClick(event) {
        // Abstract method - No default implementation
        throw new Error("The _handleOutsideClick method must be implemented by the subclass.");
    }

    /**
    * Closes the modal. Must be implemented by the subclass.
    * @throws {Error} - This method must be implemented by the subclass.
    */
    _close() {
        // Abstract method - No default implementation
        throw new Error("The _close method must be implemented by the subclass.");
    }

    /**
    * Traps the focus inside the modal for accessibility purposes.
    * @param {KeyboardEvent} event - The keydown event.
    */
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