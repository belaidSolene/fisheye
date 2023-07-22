/* eslint-disable no-undef */
// The IndexApp class is responsible for managing all the JavaScript logic for the index.js page.
// It handles the dynamic creation and display of photographer cards on the webpage.
class IndexApp extends App {
    constructor() {
        super();

        // The data file 'photographers-data.json' will be used as the data source.
        this.photographersApi = new PhotographersApi('./data/photographers-data.json');

        this.$photographersWrapper = document.querySelector('.photographer-section');
    }

    async main() {
        const photographersData = await this.photographersApi.getAllPhotographers();

        photographersData
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const template = new PhotographerCard(photographer)
                this.$photographersWrapper.appendChild(
                    template.createPhotographerCard()
                )
            });
    }
}

const indexApp = new IndexApp();
indexApp.main();