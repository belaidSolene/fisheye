/* eslint-disable no-undef */

// The PhotographerApp class is responsible for managing the JavaScript logic for the photographer.html page.
// It handles data retrieval and dynamically creates the photographer's header, media section, and contact form.
class PhotographerApp extends App {
    constructor() {
        super();

        // Initialize and store URL parameters to extract the photographer's ID from the query string.
        this.URLparams = new URLSearchParams(window.location.search);

        // The data file 'photographers-data.json' will be used as the data source.
        this.photographersApi = new PhotographersApi('./data/photographers-data.json');

        // Get references to various DOM elements to be manipulated.
        this.mediaListbox = document.querySelector('.mediaListbox');
        this.$photographerWrapper = document.querySelector('.photographer-header');
        this.$mediaWrapper = document.querySelector('.medias-section');
        this.$wrapperInsertLikesAndPrice = document.querySelector('.insertLikesAndPrice');
    }

    async main() {
        try {
            // Get the photographer's ID from the URL query parameters.
            const id = this.URLparams.get("id");
            const photographerData = await this.photographersApi.getPhotographerById(id);

            // Create instances of Photographer and Media objects from the fetched data.
            const photographer = new Photographer(photographerData.photographer);
            const medias = photographerData.medias.map(media => new MediasFactory(media));


            // Create the photographer's header and insert it into the corresponding DOM element.
            const templatePhotographer = new PhotographerCard(photographer);
            templatePhotographer.createPhotographerHeader(this.$photographerWrapper);

            // Calculate the total likes of all media for the photographer and display it on the page.
            this.$wrapperInsertLikesAndPrice.innerHTML = templatePhotographer.insertLikesAndPrice(this._getTotalLikes(medias));


            // Render the media section on the page and allow dynamic sorting of media based on the user's selection.
            const displayMedia = new DisplayMedia(medias, this.$mediaWrapper, this.mediaListbox);
            displayMedia.render();

        } catch (error) {
            // If an error occurs during data retrieval or processing,
            // catch the error and log it to the console for debugging purposes.
            console.log('Error occurred during main function execution:', error);
        }
    }

    // Private method '_getTotalLikes' calculates the total likes across all media objects for a photographer.
    _getTotalLikes(medias) {
        return medias.reduce((sum, media) => sum + media.likes, 0);
    }
}

const app = new PhotographerApp();
app.main();
