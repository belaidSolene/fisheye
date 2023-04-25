class MediaListBox {
  constructor(listbox) {
    this._listbox = listbox;
    this._listboxButton = this._listbox.querySelector('.listbox__btn');
    this._listboxItems = this._listbox.querySelectorAll('.listbox__item');
    this._currentItem = this._listbox.querySelector('[aria-selected="true"]');
    
    this._init();
  }

  _init() {
    this._listboxButton.addEventListener('click', () => {
      this._listbox.classList.toggle('show');
    });

    this._listboxItems.forEach(item => {

      item.addEventListener('click', () => {

        this._currentItem.setAttribute('aria-selected', 'false');
        this._currentItem = item;
        this._currentItem.setAttribute('aria-selected', 'true');
        this._listboxButton.querySelector('.listbox__label').textContent =  this._currentItem.textContent;
        this._listbox.classList.remove('show');
      });
    });
  }

  getSelectedOption() {
    return this._currentItem.dataset.sortBy;
  }

  get options() {
    return this._listboxItems;
  }
}