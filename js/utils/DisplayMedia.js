class DisplayMedia {
    constructor(mediaList, mediaContainer, mediaListBox) {
        this._mediaList = mediaList;
        this._mediaContainer = mediaContainer;
        this._mediaListBox = new MediaListBox(mediaListBox);
        this._sortedList = this._sortMediaList()

        this._addSortEventListener();
    }

    _addSortEventListener() {
        this._mediaListBox.options.forEach(item => {

            item.addEventListener('click', () => {
                this._sortedList = this._sortMediaList();
                this.render();
            })
        })
      }

    _sortMediaList() {
        const sortBy = this._mediaListBox.getSelectedOption();

       return new SortMedia().sort(this._mediaList, sortBy);
    }

    render() {
        this._mediaContainer.innerHTML = '';

        this._sortedList.forEach(media => {
            const template = new MediaCard(media)
            this._mediaContainer.appendChild(template.createMediaCard());
        });
    }
}