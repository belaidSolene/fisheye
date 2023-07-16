class IndexApp extends App {
    constructor() {
        super();
        
        this.$photographersWrapper = document.querySelector('.photographer-section')
        this.photographersApi = new PhotographersApi('data/photographers-data.json')
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

const indexApp = new IndexApp()
indexApp.main()