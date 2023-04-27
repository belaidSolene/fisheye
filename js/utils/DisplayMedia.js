class DisplayMedia {
    constructor(medias, mediaContainer, mediaListbox) {
        this._mediaListbox = new ListBox(mediaListbox);

        this._sortedList = this._sortMediaList(medias)

        this._mediaContainer = mediaContainer;

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

    _sortMediaList(medias) {
        const sortBy = this._mediaListbox.getSelectedOption();
        return new Sort().sortMedias(medias, sortBy);
    }

    render() {
        this._mediaContainer.innerHTML = '';

        this._sortedList.forEach(media => {
            const template = new MediaCard(media)
            this._mediaContainer.appendChild(template.createMediaCard(this._sortedList));
        });
    }

    get sortedList() {
        return this._sortedList;
    }
}

