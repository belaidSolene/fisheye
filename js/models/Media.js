/* eslint-disable no-unused-vars */
// The Media class represents a generic media item, which can be an image or a video.
class Media {
    constructor(data) {
        // Initialize properties based on the data provided.
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }
}

// The Image class extends the Media class and represents an image media item.
class Image extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    // Get the URL of the image file based on the photographerId and image filename.
    get image() {
        return `./public/assets/portfolio/${this._photographerId}/${this._image}`;
    }

    // Getter method to indicate the type of media (image).
    get type() {
        return 'image';
    }
}

// The Video class extends the Media class and represents a video media item.
class Video extends Media {
    constructor(data) {
        super(data);
        this._video = data.video;
    }

    // Get the URL of the video file based on the photographerId and video filename.
    get video() {
        return `./public/assets/portfolio/${this._photographerId}/${this._video}`;
    }

    // Getter method to indicate the type of media (video).
    get type() {
        return 'video';
    }
}