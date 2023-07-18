export const fetchData = async () => {
  const apiKey = 'bbf4c89ab60a06edaaa10148efbb86fc';
  const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

  try {
    const response = await fetch(`${url}?api_key=${apiKey}`);
    const data = await response.json();

    const appElement = document.getElementById('app');
    appElement.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('movie-container');

    data.results.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.title;
      movieCard.appendChild(movieTitle);

      const movieOverview = document.createElement('p');
      movieOverview.textContent = movie.overview;
      movieCard.appendChild(movieOverview);

      container.appendChild(movieCard);
    });

    appElement.appendChild(container);

    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};
