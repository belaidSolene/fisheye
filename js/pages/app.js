
class App {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer-section')
        this.photographersApi = new PhotographersApi('/data/photographers-data.json')

        this._addStyleFocus();
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

    _addStyleFocus() {
        document.addEventListener('keydown', () => {
            document.body.classList.add('key-navigation');
        })

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('key-navigaton');
        })
    }
}

const app = new App()
app.main()