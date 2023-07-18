/**
 * The DisplayMedia class is responsible for rendering and managing the display of media items on the page.
 * @param {Array<Media>} medias - The array of media items to be displayed.
 * @param {HTMLElement} mediaContainer - The container element where the media items will be rendered.
 * @param {HTMLElement} mediaListbox - The listbox element used for sorting the media items.
 */
class DisplayMedia {
    constructor(medias, mediaContainer, mediaListbox) {
        this._medias = medias;
        this._mediaContainer = mediaContainer;
        this._mediaListbox = new ListBox(mediaListbox);
        this._sortedList = this._sortMediaList(); // The current sorted list of media items

        // Add event listeners to the media listbox for sorting.
        this._addSortEventListener();
    }

    /**
    * Add event listeners to the media listbox for sorting media items based on user selection.
    * @private
    */
    _addSortEventListener() {
        this._mediaListbox.options.forEach(item => {
            item.addEventListener('click', () => {
                this._sortedList = this._sortMediaList();
                this.render();
            })

            item.addEventListener('keydown', (event) => {
                const key = event.code;

                if (key === 'Enter' || key === 'Space' || key === 'Tab') {
                    this._sortedList = this._sortMediaList();
                    this.render();
                }
            })
        })
    }

    /**
    * Sort the media items based on the selected option in the media listbox.
    * @returns {Array<Media>} - The sorted list of media items.
    * @private
    */
    _sortMediaList() {
        const sortBy = this._mediaListbox.getSelectedOption();
        return new Sort().sortMedias(this._medias, sortBy);
    }

    /**
    * Render the media items on the page using the sorted list of media items.
    */
    render() {
        this._mediaContainer.innerHTML = '';

        this._sortedList.forEach(media => {
            const template = new MediaCard(media);
            this._mediaContainer.appendChild(template.createMediaCard(this._sortedList));
        });
    }

    /**
     * Get the current sorted list of media items.
     * @returns {Array<Media>} - The current sorted list of media items.
     */
    get sortedList() {
        return this._sortedList;
    }
}

