// Fonction de tri des médias en fonction du bouton cliqué
function sortByButton(button, medias) {
  switch (button.dataset.sortBy) {
    case 'likes':
      medias.sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      medias.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'title':
      medias.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return medias;
}


class SortMedia {
  sort(mediaList, sortBy) {
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

    return mediaList;
  }
}
/*
const dropdownButton = document.querySelector('.dropdown-toggle');
const dropdownList = document.querySelector('.dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownList.classList.toggle('show');
});

// Masquer le menu déroulant si l'utilisateur clique en dehors du menu
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    dropdownList.classList.remove('show');
  }
});

// Mettre à jour le bouton avec l'option sélectionnée
dropdownList.addEventListener('click', (event) => {
  const selectedOption = event.target.textContent;
  dropdownButton.textContent = selectedOption;
  dropdownList.classList.remove('show');
});


const dropdownLinks = document.querySelectorAll('.dropdown-item');

dropdownLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sortBy = event.target.getAttribute('data-sort-by');
    // Utilisez la valeur de sortBy pour trier votre liste
    console.log(sortBy);
  });
}); 

*/


