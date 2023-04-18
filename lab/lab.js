class PhotographerPage {
    constructor() {
        this.$photographerWrapper = document.querySelector('.photographer-header')
        this.$mediaWrapper = document.querySelector('medias-section')

        this.params = new URLSearchParams(window.location.search);
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')
    }

    async main() {
        try {
            const id = await this.params.get("id")
            console.log(`getId : ${id}`);

            const photographerData = await this.photographersApi.getPhotographerById(id)

            const photographer = new Photographer(photographerData.photographer)
            console.log(`forfait : ${photographer.price}`);

            const template = new PhotographerCard(photographer)
            template.createPhotographerHeader(this.$photographerWrapper)

            const medias = photographerData.medias.map(media => new MediasFactory(media))
            console.log(medias);



        } catch (error) {
            console.log(error);
        }
    }
}

const photographerPage = new PhotographerPage();

photographerPage.main()