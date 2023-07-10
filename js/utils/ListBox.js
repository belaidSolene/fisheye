class ListBox {
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

  _addEventListenersListboxButton() {
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
          const indexFocus = this._currentIndex > 0 ? 0 : 1;
          this._focusItem(indexFocus);
          this._toggleListBox();

          break;

        case 'ArrowDown':
          event.preventDefault();
          if (this._isOpen) {
            const indexFocus = this._currentIndex > 0 ? 0 : 1;
            this._focusItem(indexFocus);
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

  _addEventListenersListboxItems() {
    this._listboxItems.forEach(item => {
      const selectItem = () => {
        //old item can be selected again
        this._currentItem.setAttribute('aria-selected', 'false');

        // update attributs currentItem
        this._currentItem = item;
        this._currentItem.setAttribute('aria-selected', 'true');
        this._currentIndex = Array.from(this._listboxItems).indexOf(this._currentItem);
        updateTextButton();

        this._closeListBox();
      };

      const updateTextButton = () => {
        const textButton = this._currentItem.querySelector('.listbox__item__txt').textContent;
        
        const $wrapperTxtBtn = this._listboxButton.querySelector('#listbox-choice');
        $wrapperTxtBtn.textContent = textButton;
        $wrapperTxtBtn.setAttribute('data-text', textButton);

        this._listboxButton.querySelector('#listbox-choice-sr').textContent = textButton;

        /* 
        HTML :
        <div class="element">
          Texte principal
        </div>

        CSS :
        .element::after {
            content: ""; /* Par défaut, le contenu de ::after est vide //
             /* Autres styles pour ::after //
        }

        JS :
        var element = document.querySelector('.element');
        var textContent = element.textContent;
        element.style.setProperty('--after-content', "'" + textContent + "'");

        CSS (avec variable) :
        .element::after {
          content: var(--after-content);
          /* Autres styles pour ::after //
        }
        */
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

      item.addEventListener('click', selectItem);
    });
  }

  _focusItem(index) {
    this._listboxItems[index].focus();
  };

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