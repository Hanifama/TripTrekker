export async function fetchData() {
    const apiKey = 'bbf4c89ab60a06edaaa10148efbb86fc';
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;

   fetch(url + '?api_key=' + apiKey)
  .then(response => response.json())
  .then(data => {
    const appElement = document.getElementById('app');
    appElement.innerHTML = '';

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
  })
  .catch(error => console.error('Error:', error));
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }
  