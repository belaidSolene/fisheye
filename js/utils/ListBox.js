class ListBox {
  constructor(listbox) {
    this._listbox = listbox;
    this._listboxButton = this._listbox.querySelector('.listbox__btn');
    this._listboxItems = this._listbox.querySelectorAll('.listbox__item');
    this._currentItem = this._listbox.querySelector('[aria-selected="true"]');
    this._currentIndex = Array.from(this._listboxItems).indexOf(this._currentItem);
    this._isOpen = false;

    this._init();
  }

  _init() {
    this._listboxButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._toggleListBox();
    });

    this._listboxButton.addEventListener('keydown', (event) => {
      const key = event.code;

      switch (key) {
        case 'Enter':
        case 'Space':
          event.preventDefault();
          this._toggleListBox();
          const indexFocus = this._currentIndex > 0 ? 0 : 1;
          this._listboxItems[indexFocus].focus();
          break;

        case 'ArrowDown': 
          event.preventDefault();
          if (this._isOpen) {
            const indexFocus = this._currentIndex > 0 ? 0 : 1;
            this._listboxItems[indexFocus].focus();
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

    this._addEventListenersListboxItems();
  }

  _addEventListenersListboxItems() {
    this._listboxItems.forEach(item => {
      const selectItem = () => {
        //old item can be selected again
        this._currentItem.setAttribute('aria-selected', 'false');

        // update attributs currentItem
        this._currentItem = item;
        this._currentItem.setAttribute('aria-selected', 'true');
        this._listboxButton.querySelector('.listbox__label').textContent = this._currentItem.textContent;
        this._closeListBox();
      };

      const focusItem = (index) => {
        this._listboxItems[index].focus();
      };


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
            focusItem(this._currentIndex);
            break;

          case 'ArrowDown':
            event.preventDefault();
            this._currentIndex = this._currentIndex < this._listboxItems.length - 1 ? this._currentIndex + 1 : 0;
            focusItem(this._currentIndex);
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

      item.addEventListener('click', selectItem);
    });

  }

  getSelectedOption() {
    return this._currentItem.dataset.sortBy;
  }

  get options() {
    return this._listboxItems;
  }

  _toggleListBox() {
    this._isOpen ? this._closeListBox() : this._openListBox();
  }

  _openListBox() {
    this._isOpen = true;
    this._listbox.classList.add('show');
    this._listboxButton.setAttribute("aria-expanded", "true");
    this._listboxButton.querySelector('.fa-chevron-down').classList.add('rotated');
    document.addEventListener('click', this._handleOutsideClick);
  }

  _closeListBox() {
    this._isOpen = false;
    this._listbox.classList.remove('show');
    this._listboxButton.setAttribute("aria-expanded", "false");
    this._listboxButton.querySelector('.fa-chevron-down').classList.remove('rotated');
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick = (event) => {
    if (this._isOpen && !this._listbox.contains(event.target)) {
      this._closeListBox();
      this._listboxButton.focus();
    }
  }
}