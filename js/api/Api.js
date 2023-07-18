// The Api class is a base class for making HTTP requests to a specified URL and fetching data.
class Api {
    /**
     * 
     * @param {string} url - The URL used for fetching data.
     */
    constructor(url) {
        this._url = url;
    }

    /**
     * Make a GET request to the API and retrieve data.
     * @param {string} dataKey - (Optional) The key to access a specific data property from the response.
     * @returns {Promise} - A promise that resolves with the fetched data.
     */
    async get(dataKey) {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => dataKey ? res[dataKey] : res)
            .catch(err => console.log('an error occurs when retrieving the data', err));
    }
}

// The PhotographersApi class extends the base Api class and provides methods to fetch photographers and their media data.
class PhotographersApi extends Api {
    /**
     * Create a new PhotographersApi instance with the specified URL.
     * @param {string} url 
     * 
     */
    constructor(url) {
        super(url);
    }

    /**
     * Fetch all photographers' data from the API.
     * @returns {Promise} - A promise that resolves with the fetched photographers' data.
     */
    async getAllPhotographers() {
        return await this.get('photographers');
    }

    /**
    * Fetch a specific photographer's data by their identifier (ID).
    * @param {string} identifier - The ID of the photographer to fetch.
    * @returns {Object} - An object containing the photographer's data and their associated media.
    * @throws {Error} - Throws an error if the photographer with the given ID is not found.
    */
    async getPhotographerById(identifiant) {
        const data = await this.get();
        const id = parseInt(identifiant);

        const photographer = data.photographers.find((p) => p.id === id);
        if (!photographer) {
            throw new Error(`Photographer with ID '${id}' not found`);
        }

        const medias = data.media.filter((m) => m.photographerId === id);

        return { photographer, medias };
    }
}