class DisplayMedia {
    constructor(mediaList, mediaContainer, mediaListbox) {
        this._mediaList = mediaList;
        this._mediaContainer = mediaContainer;
        this._mediaListbox = new ListBox(mediaListbox);
        this._sortedList = this._sortMediaList()

        this._addSortEventListener();
    }

    _addSortEventListener() {
        this._mediaListbox.options.forEach(item => {
            item.addEventListener('click', () => {
                this._sortedList = this._sortMediaList();
                this.render();
            })
        })
      }

    _sortMediaList() {
        const sortBy = this._mediaListbox.getSelectedOption();

       return new Sort().sortMedias(this._mediaList, sortBy);
    }

    render() {
        this._mediaContainer.innerHTML = '';

        this._sortedList.forEach(media => {
            const template = new MediaCard(media)
            this._mediaContainer.appendChild(template.createMediaCard());
        });
    }
}