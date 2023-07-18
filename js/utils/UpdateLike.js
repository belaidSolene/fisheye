//  The UpdateLike class handles updating the like count for media items and the total likes display on the hotographer.html page.
class UpdateLike {
    constructor() {
        this._$wrapperTotalLikes = document.querySelector('.total-likes'); // the element that displays the total likes count.
    }

    /**
    * Update the like count for a specific media item and the total likes display on the page.
    * @param {HTMLElement} btn - The button element representing the like button for the media item.
    */
    update(btn) {
        const isLiked = btn.classList.contains('liked');
        const likes = parseInt(btn.innerText);
        const totalLikes = parseInt(this._$wrapperTotalLikes.innerText);

        if (isLiked) {
            // If the media item is already liked, decrease the like count.
            btn.innerHTML = this._getLikeContent(likes - 1);
            this._$wrapperTotalLikes.innerHTML = this._getLikeContent(totalLikes - 1);
        } else {
            // If the media item is not liked, increase the like count.
            btn.innerHTML = this._getLikeContent(likes + 1);
            this._$wrapperTotalLikes.innerHTML = this._getLikeContent(totalLikes + 1);
        }

        // Toggle the 'liked' class for the media item.
        btn.classList.toggle('liked');
    }

    /**
    * Get the HTML content for the like count with the heart icon.
    * @param {number} count - The current like count.
    * @returns {string} - The updated like count with the heart icon.
    * @private
    */
    _getLikeContent(count) {
        return `${count} <i class="fa-solid fa-heart"></i>`;
    }
}

