/* eslint-disable no-unused-vars */
// The Photographer class represents a photographer with their associated data.
class Photographer {
    constructor(data) {
        // Initialize properties based on the data provided.
        this._name = data.name;
        this._id = data.id;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    // Get the localized city and country of the photographer.
    get localisation() {
        return `${this._city}, ${this._country}`;
    }

    get tagline() {
        return this._tagline;
    }

    // Get the price of the photographer's services formatted as "price€/jour".
    get price() {
        return `${this._price}€<span aria-hidden="true">/</span><span class="sr-only">par</span>jour`;
    }

    // Get the URL of the photographer's portrait image.
    // Based on the filename of the photographer's portrait.
    get portrait() {
        return `./public/assets/photographers/${this._portrait}`;
    }
}