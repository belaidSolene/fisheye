// The Sort class provides static methods to sort media items based on different criteria.
class Sort {
  /**
  * Sorts the media items in the given media list based on the specified sorting criteria.
  * @param {Array<Media>} mediaList - The list of media items to be sorted.
  * @param {string} sortBy - The sorting criteria (options: 'likes', 'date', 'title').
  * @returns {Map} - A Map object with media items sorted by their IDs.
  */
  sortMedias(mediaList, sortBy) {
    switch (sortBy) {
      case 'likes':
      default:
        mediaList.sort((a, b) => b.likes - a.likes);
        break;

      case 'date':
        mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      case 'title':
        mediaList.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return new Map(mediaList.map(media => [media.id, media]));
  }
}

