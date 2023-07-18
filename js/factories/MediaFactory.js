// The MediasFactory class is a factory for creating media objects (Image or Video) based on the provided data.
class MediasFactory {
    /**
     * Create a new media object (Image or Video) based on the provided data.
     * @param {Object} data - The data representing a media item.
     * @returns {Image | Video} - An instance of Image or Video, based on the data type.
     * @throws {string} - Throws an error for unknown media types.
     */
    constructor(data) {
        if (data.hasOwnProperty('image')) {
            return new Image(data);
        } else if (data.hasOwnProperty('video')) {
            return new Video(data);
        } else {
            throw 'unknown media type';
        }
    }
}