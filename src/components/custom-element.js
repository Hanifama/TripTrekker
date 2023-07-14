class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.genres = []; // Array untuk menyimpan daftar genre
    this.selectedGenre = ''; // Genre yang dipilih oleh pengguna
  }

  connectedCallback() {
    this.innerHTML = `
      <p>Haii Admin Dicoding Aku Harist Fadlilah</p>
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="Search movies by title...">
        <button id="searchButton">Search</button>
      </div>
      <div class="genre-container">
        <label for="genreSelect">Select Genre:</label>
        <select id="genreSelect">
          <option value="">All</option>
        </select>
      </div>
      <div id="movie-list"></div>
    `;
    this.loadGenres();
    this.loadMovieList();

    const searchInput = this.querySelector('#searchInput');
    const searchButton = this.querySelector('#searchButton');
    const genreSelect = this.querySelector('#genreSelect');
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      this.searchMovies(searchTerm);
    });
    genreSelect.addEventListener('change', () => {
      this.selectedGenre = genreSelect.value;
      this.filterMovies();
    });
  }

  async loadGenres() {
    try {
      const url = 'https://api.themoviedb.org/3/genre/movie/list';
      const apiKey = 'bbf4c89ab60a06edaaa10148efbb86fc'; // Ganti dengan API Key yang valid

      const response = await fetch(`${url}?api_key=${apiKey}`);
      const data = await response.json();
      this.genres = data.genres;
      this.renderGenres();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  renderGenres() {
    const genreSelect = this.querySelector('#genreSelect');
    genreSelect.innerHTML = '<option value="">All</option>';
    this.genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  }

  async loadMovieList() {
    try {
      const url = 'https://api.themoviedb.org/3/movie/popular';
      const apiKey = 'bbf4c89ab60a06edaaa10148efbb86fc'; // Ganti dengan API Key yang valid

      const response = await fetch(`${url}?api_key=${apiKey}`);
      const data = await response.json();
      this.renderMovieList(data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async searchMovies(searchTerm) {
    try {
      const url = 'https://api.themoviedb.org/3/search/movie';
      const apiKey = 'bbf4c89ab60a06edaaa10148efbb86fc'; // Ganti dengan API Key yang valid

      const response = await fetch(`${url}?api_key=${apiKey}&query=${searchTerm}`);
      const data = await response.json();
      this.renderMovieList(data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  filterMovies() {
    const movieListContainer = this.querySelector('#movie-list');
    const movies = movieListContainer.querySelectorAll('.movie-card');
    
    movies.forEach(movie => {
      const genres = movie.dataset.genres.split(','); // Ambil genre film dari atribut data-genres
      if (this.selectedGenre === '' || genres.includes(this.selectedGenre)) {
        movie.style.display = 'block'; // Tampilkan film jika genre cocok atau tidak ada genre yang dipilih
      } else {
        movie.style.display = 'none'; // Sembunyikan film jika genre tidak cocok
      }
    });
  }
  
  renderMovieList(movies) {
    const movieListContainer = this.querySelector('#movie-list');
    movieListContainer.innerHTML = '';
  
    if (movies.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'Maaf, film yang anda cari tidak ada.';
      movieListContainer.appendChild(message);
    } else {
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.dataset.genres = movie.genre_ids.join(','); // Simpan genre film dalam atribut data-genres
  
        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        movieImage.alt = movie.title;
        movieCard.appendChild(movieImage);
  
        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);
  
        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;
        movieCard.appendChild(movieOverview);
  
        movieListContainer.appendChild(movieCard);
      });
    }
  
    this.filterMovies(); // Terapkan filter genre pada daftar film
  }
  
}

customElements.define('custom-element', CustomElement);
