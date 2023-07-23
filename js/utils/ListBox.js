/* eslint-disable no-unused-vars */
// The ListBox class represents a custom dropdown listbox with keyboard accessibility and focus management.
class ListBox {
  /**
  * @param {HTMLElement} listbox - The element representing the listbox container.
  */
  constructor(listbox) {
    this._listbox = listbox;
    this._listboxButton = this._listbox.querySelector('.listbox__btn');
    this._listboxItems = this._listbox.querySelectorAll('.listbox__item');
    this._currentItem = this._listbox.querySelector('[aria-selected="true"]');
    this._currentIndex = Array.from(this._listboxItems).indexOf(this._currentItem);
    this._isOpen = false;

    this._addEventListenersListboxButton();
    this._addEventListenersListboxItems();
  }

  /**
  * Add event listeners to the listbox button for opening and navigating the listbox.
  * @private
  */
  _addEventListenersListboxButton() {
    // Click event listener for opening the listbox
    this._listboxButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._toggleListBox();
    });

    // Keyboard event listener for handling listbox navigation and open/close actions
    this._listboxButton.addEventListener('keydown', (event) => {
      const key = event.code;

      switch (key) {
        case 'Enter':
        case 'Space':
          event.preventDefault();
          this._focusItem(this._currentIndex > 0 ? 0 : 1);
          this._toggleListBox();
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (this._isOpen) {
            this._focusItem(this._currentIndex > 0 ? 0 : 1);
          } else {
            this._openListBox();
          }
          break;

        case 'Escape':
          event.preventDefault();
          this._closeListBox();
          break;

        case 'Tab':
          this._closeListBox();
          break;
      }
    });
  }

  /**
  * Add event listeners to the listbox items for keyboard navigation and selection.
  * @private
  */
  _addEventListenersListboxItems() {
    this._listboxItems.forEach(item => {
      // Function to select the item and update the listbox button text
      const selectItem = () => {
        this._currentItem.setAttribute('aria-selected', 'false');

        this._currentItem = item;
        this._currentItem.setAttribute('aria-selected', 'true');
        this._currentIndex = Array.from(this._listboxItems).indexOf(this._currentItem);
        updateTextButton();

        this._closeListBox();
      };

      // Function to update the text on the listbox button with the selected item text
      const updateTextButton = () => {
        const textButton = this._currentItem.querySelector('.listbox__item__txt').textContent;
        const $wrapperTxtBtn = this._listboxButton.querySelector('#listbox-choice');
        $wrapperTxtBtn.textContent = textButton;
        $wrapperTxtBtn.setAttribute('data-text', textButton);
      };

      // Keyboard event listener for item navigation and selection
      item.addEventListener('keydown', (event) => {
        const key = event.code;

        switch (key) {
          case 'Enter':
          case 'Space':
            event.preventDefault();
            selectItem();
            this._listboxButton.focus();
            break;

          case 'ArrowUp':
            event.preventDefault();
            this._currentIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._listboxItems.length - 1;
            this._focusItem(this._currentIndex);
            break;

          case 'ArrowDown':
            event.preventDefault();
            this._currentIndex = this._currentIndex < this._listboxItems.length - 1 ? this._currentIndex + 1 : 0;
            this._focusItem(this._currentIndex);
            break;

          case 'Escape':
            event.preventDefault();
            this._listboxButton.focus();
            this._closeListBox();
            break;

          case 'Tab':
            selectItem();
            this._closeListBox();
            break;
        }

      });

      // Click event listener for item selection
      item.addEventListener('click', selectItem);
    });
  }

  /**
  * Set focus on the specified item in the listbox.
  * @param {number} index - The index of the item to focus.
  * @private
  */
  _focusItem(index) {
    this._listboxItems[index].focus();
  }

  /**
  * Get the value of the currently selected option in the listbox.
  * @returns {string} - The value of the currently selected option.
  */
  getSelectedOption() {
    return this._currentItem.dataset.sortBy;
  }

  /**
  * Get the list of listbox options.
  * @returns {NodeList} - The list of listbox items (options).
  */
  get options() {
    return this._listboxItems;
  }

  /**
  * Toggle the visibility of the listbox.
  * @private
  */ 
  _toggleListBox() {
    this._isOpen ? this._closeListBox() : this._openListBox();
  }

  /**
  * Open the listbox and make it visible.
  * @private
  */
  _openListBox() {
    this._isOpen = true;
    this._listbox.classList.add('show');
    this._listboxButton.setAttribute("aria-expanded", "true");
    this._listboxButton.querySelector('.fa-chevron-down').classList.add('rotated');
    document.addEventListener('click', this._handleOutsideClick);
  }

  /**
  * Close the listbox and make hide it.
  * @private
  */
  _closeListBox() {
    this._isOpen = false;
    this._listbox.classList.remove('show');
    this._listboxButton.setAttribute("aria-expanded", "false");
    this._listboxButton.querySelector('.fa-chevron-down').classList.remove('rotated');
    document.removeEventListener('click', this._handleOutsideClick);
  }

  /**
  * Event handler to close the listbox when clicking outside of it.
  * @param {Event} event - The click event.
  * @private
  */
  _handleOutsideClick = (event) => {
    if (this._isOpen && !this._listbox.contains(event.target)) {
      this._closeListBox();
      this._listboxButton.focus();
    }
  }
}