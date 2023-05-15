
class PhotographerApp extends App {
    constructor() {
        super()
        this.URLparams = new URLSearchParams(window.location.search);
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')

        this.mediaListbox = document.querySelector('.mediaListbox')

        this.$photographerWrapper = document.querySelector('.photographer-header')
        this.$mediaWrapper = document.querySelector('.medias-section')
        this.$wrapperInsertLikesAndPrice = document.querySelector('.insertLikesAndPrice')
        this.$wrapperContactTitle = document.querySelector('#contact-title')

        this._addStyleFocus();
    }

    async main() {
        try {
            // récupération données du photographe en fonction de l'id
            const id = this.URLparams.get("id")
            const photographerData = await this.photographersApi.getPhotographerById(id)

            const photographer = new Photographer(photographerData.photographer)
            const medias = photographerData.medias.map(media => new MediasFactory(media))


            // création de l'en-tête de la page
            const templatePhotographer = new PhotographerCard(photographer)
            templatePhotographer.createPhotographerHeader(this.$photographerWrapper)


            // création encart totalLikes + prix du photographe
            const totalLikes = this._getTotalLikes(medias)
            templatePhotographer.insertLikesAndPrice(this.$wrapperInsertLikesAndPrice, totalLikes)

            templatePhotographer.titleContactForm(this.$wrapperContactTitle)


            // insertion des médias dans la page
            // tri des médias en fonction du bouton cliqué
            const displayMedia = new DisplayMedia(medias, this.$mediaWrapper, this.mediaListbox);
            displayMedia.render();

        } catch (error) {
            console.log(error);
        }
    }

    _getTotalLikes(medias) {
        return medias.reduce((sum, media) => sum + media.likes, 0);
    }
}

const app = new PhotographerApp();

app.main()
